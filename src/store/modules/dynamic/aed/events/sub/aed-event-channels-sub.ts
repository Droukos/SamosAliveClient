import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import {
  AedEvent,
  AedEventCloseInfo,
  AedEventInfoDto,
  AedEventRescuerInfo,
  EventComment,
  EventDevice,
  EventDto,
  EventRescuer,
  EventUser,
  EventUsers,
  RescuerAndDevice
} from "@/types/aed-event";
import { accessToken } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { aedDeviceApi, eventApi } from "@/plugins/api/api-urls";
import { latLng, LatLng } from "leaflet";
import { ISubscription } from "rsocket-types";
import { IAedDevPreview } from "@/types/aed-device";
import {
  AedDeviceAreaLookWithRoute,
  AedDevicePreviewWithRouteDto,
  DevRoutesResult,
  RouteInfo
} from "@/types/osm";
import { convertRoute } from "@/plugins/geolocation/osrm.ts";
import { PreviewRescuer, PreviewUserCh } from "@/types";
import { emptyRouteInfo, sortAedDevices } from "@/plugins/osm-util";
import AedDeviceRescuer = AedEvent.AedDeviceRescuer;
import AedComment = AedEvent.AedComment;
import AedEventCommentDto = AedEvent.AedEventCommentDto;
import {
  allUsers, chDisc, checkChCtrl, chSubs, chUsers, devEvMap, evMap, findElemOnChMap, rescuerEvMap,
  rSocketChannelStream,
  rSocketResponse, setChCtrl, tempDevEvMap
} from "@/plugins/event-channel-util";
import AedCommentReqDto = AedEvent.AedCommentReqDto;
import AedCommentsResDto = AedEvent.AedCommentsResDto;
import {aedRSocketApi, getAccessTokenJwt} from "@/plugins/api/rsocket-api";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "aedEventChannelSub"
})
export default class AedEventChannelsSub extends VuexModule {
  aedEventChannelTracker = 0;
  streamSubscriptionTracker = 0;
  rescuerChTracker = 0;
  devChTracker = 0;
  usersChTracker = 0;
  discChTracker = 0;

  showAedComments: AedComment[] = [];
  discPages = 0;
  watchingPage = 0;
  curAedEvent: AedEventInfoDto | null = null;
  previewAedDevices: IAedDevPreview[] = [];
  showPreviewAedDevices: IAedDevPreview[] = [];
  aedDeviceSelected: IAedDevPreview | null = null;
  selectedRouteInfo: RouteInfo | null | undefined = emptyRouteInfo();
  selectedRescuer: PreviewRescuer | null = null;
  rescuerPosition: LatLng | null = null;
  curEventId = "";
  notAvailableDevices = false;
  verifiedPosition = false;
  onMapDialog = false;

  @Mutation
  setMapDialog(bool: boolean) {
    this.onMapDialog = bool;
  }

  @Mutation
  setWatchingPage(watchPage: number) {
    this.watchingPage = watchPage;
  }

  @Mutation
  setThisUserPreview(data: PreviewUserCh) {
    if (!allUsers.has(data.username)) {
      allUsers.set(data.username, data);
    }
    if (chUsers.has(this.curEventId)) {
      const setChUsernames = chUsers.get(this.curEventId)!;
      if (!setChUsernames.has(data.username)) {
        setChUsernames.add(data.username);
        chUsers.set(this.curEventId, setChUsernames);
      }
    } else {
      const setChUsernames: Set<string> = new Set();
      setChUsernames.add(data.username);
      chUsers.set(this.curEventId, setChUsernames);
    }
  }

  @Mutation
  setPreviewDevices(data: IAedDevPreview[]) {
    this.previewAedDevices = data;
    this.showPreviewAedDevices = data;
  }

  @Mutation
  setSelectedDevice(data: IAedDevPreview) {
    this.aedDeviceSelected = data;
    if (data.responseRouteInfo !== undefined) {
      this.selectedRouteInfo = data.responseRouteInfo;
    }
  }

  @Mutation
  initChannelData(aedEventId: string, username: string) {
    if (tempDevEvMap.has(aedEventId)) {
      this.previewAedDevices = [...tempDevEvMap.get(aedEventId)!.values()];
      this.verifiedPosition = false;
      this.selectedRouteInfo = emptyRouteInfo();
      this.aedDeviceSelected = null;
      this.selectedRescuer = null;
    } else if (devEvMap.has(aedEventId)) {
      this.aedDeviceSelected = devEvMap.get(aedEventId)!;
      const isRescuer = (rescuerEvMap.get(aedEventId)!.user === username);
      this.selectedRescuer = rescuerEvMap.get(aedEventId)!;
      this.previewAedDevices = [this.aedDeviceSelected];
      this.selectedRouteInfo = (isRescuer)? this.aedDeviceSelected.responseRouteInfo: emptyRouteInfo();
      this.verifiedPosition = isRescuer;
    } else {
      this.previewAedDevices = [];
      this.verifiedPosition = false;
      this.selectedRouteInfo = emptyRouteInfo();
      this.selectedRescuer = null;
      this.aedDeviceSelected = null;
    }
    if (chDisc.has(aedEventId)) {
      this.showAedComments = chDisc.get(aedEventId)!.get(0)!;
    } else {
      this.showAedComments = [];
    }
    this.notAvailableDevices = false;
    this.curEventId = aedEventId;
    this.discPages = 0;
    this.watchingPage = 0;
    this.showPreviewAedDevices = this.previewAedDevices;
    this.onMapDialog = false;
  }

  @Mutation
  setShowPreviewAedDevice(previewAedDevices: IAedDevPreview[]) {
    if (this.onMapDialog) {
      return;
    }
    this.showPreviewAedDevices = previewAedDevices;
    if (previewAedDevices.length == 1) {
      this.selectedRouteInfo = previewAedDevices[0].responseRouteInfo;
    } else {
      this.selectedRouteInfo = emptyRouteInfo();
    }
  }

  @Mutation
  verifyRescuerPos(verify: boolean) {
    this.verifiedPosition = verify;
  }

  @Mutation
  setRescuerPos(data: LatLng) {
    this.rescuerPosition = data;
  }

  @Mutation
  setRescuerPos2(data: Position) {
    this.rescuerPosition = latLng(data.coords.latitude, data.coords.longitude);
  }

  @Mutation
  setPreviewAedDevices(data: DevRoutesResult) {
    if (data.devRoutes.length == 0) {
      this.notAvailableDevices = true;
      return;
    }
    const aedEventId = data.devRoutes[0].aedEventId;
    const locale = data.locale;

    this.showPreviewAedDevices = [];
    for (const dto of data.devRoutes) {
      dto.aedDeviceInfoPreviewDto.responseRouteInfo = convertRoute(
        JSON.parse(dto.routeInfo).routes[0],
        locale
      );
      this.showPreviewAedDevices.push(dto.aedDeviceInfoPreviewDto);
    }
    tempDevEvMap.set(aedEventId, this.showPreviewAedDevices);
    this.previewAedDevices = this.showPreviewAedDevices;
    sortAedDevices(this.previewAedDevices);
  }

  @Mutation
  setDeviceAndRescuer(data: AedDeviceRescuer) {
    if (data === null) return;
    this.previewAedDevices = [];
    this.aedDeviceSelected = {
      id: data.id,
      uniqueNickname: data.uniqueNickname,
      modelName: data.modelName,
      description: data.description,
      homePoint: data.homePoint,
      picUrl: data.picUrl,
      status: data.status,
      address: data.address,
      takenOn: data.takenOn,
      estimatedFinish: data.estimatedFinish,
      onEventId: data.onEventId,
      onUserId: data.rescuerUsername
    };
    this.selectedRescuer = {
      user: data.rescuerUsername,
      name: data.rescuerName,
      sur: data.rescuerSurname,
      email: data.rescuerEmail,
      phone: data.rescuerPhone,
      status: data.rescuerStatus,
      id: data.rescuerUsername,
      avatar: data.rescuerAvatar,
      roles: data.rescuerRoles,
      on: true
    };
  }

  @Mutation
  setDeviceAndRescuer2(data: RescuerAndDevice) {
    this.previewAedDevices = [];
    this.aedDeviceSelected = data.device;
    this.selectedRescuer = data.rescuer;
  }

  @Mutation
  setAedEventInfo(data: any) {
    if (data.eventId != null) {
      data = data.value;
    }
    evMap.set(data.id, data);
    if (this.curEventId == data.id) {
      this.curAedEvent = data;
      this.discPages = Math.floor(data.commsN / 50);
    }
    ++this.aedEventChannelTracker;
  }

  @Mutation
  setRescuerInfo(data: EventRescuer) {
    console.log(data);
    rescuerEvMap.set(data.eventId, data.value);
    allUsers.set(data.value.user, {
      id: data.value.id,
      username: data.value.user,
      avatar: data.value.avatar,
      status: data.value.status,
      roles: data.value.roles
    });
    if (data.eventId == this.curEventId) {
      this.selectedRescuer = data.value;
      ++this.usersChTracker;
      ++this.rescuerChTracker;
    }
  }

  @Mutation
  setAedDeviceInfo(data: EventDevice) {
    if (
      devEvMap.has(data.eventId) &&
      devEvMap.get(data.eventId)!.responseRouteInfo != undefined
    ) {
      data.value.responseRouteInfo = devEvMap.get(
        data.eventId
      )!.responseRouteInfo;
    }
    devEvMap.set(data.eventId, data.value);
    ++this.devChTracker;
    if (data.eventId == this.curEventId) {
      this.aedDeviceSelected = data.value;
      this.previewAedDevices = [];
      this.previewAedDevices.push(this.aedDeviceSelected);
      this.showPreviewAedDevices = this.previewAedDevices;
    }
  }

  @Mutation
  setLiveCommentInMapDiscussion(data: EventComment) {
    const comPages = Math.floor(data.value.allComments! / 50);
    delete data.value.allComments;

    if (chDisc.has(data.eventId)) {
      const pageAedComments = chDisc.get(data.eventId)!;

      if (pageAedComments.has(comPages)) {
        pageAedComments.get(comPages)!.push(data.value);
      } else {
        pageAedComments.set(comPages, [data.value]);
      }
      chDisc.set(data.eventId, pageAedComments);
    } else {
      const pComms: Map<number, AedComment[]> = new Map<number, AedComment[]>();
      pComms.set(0, [data.value]);
      chDisc.set(data.eventId, pComms);
    }
    if (data.eventId == this.curEventId) {
      if (this.discPages != comPages) {
        this.discPages = comPages;
      }
      if (this.watchingPage == comPages) {
        this.showAedComments = chDisc.get(data.eventId)!.get(comPages)!;
      }
    }
    ++this.discChTracker;
  }

  @Mutation
  setFetchedCommentsInMap(data: AedCommentsResDto) {
    if (data == null || data.comments.length <= 0) {
      return;
    }
    const eventId = data.comments[0].eventId;
    const pComms = chDisc.has(eventId)
      ? chDisc.get(eventId)!
      : new Map<number, AedComment[]>();

    pComms.set(data.pageOffset, data.comments);
    chDisc.set(eventId, pComms);
    this.showAedComments = data.comments;
  }

  @Mutation
  setUserInfoInMap(data: EventUser) {
    allUsers.set(data.value.username, data.value);

    if (chUsers.has(data.eventId)) {
      const setChUsernames = chUsers.get(data.eventId)!;
      if (!setChUsernames.has(data.value.username)) {
        setChUsernames.add(data.value.username);
        chUsers.set(data.eventId, setChUsernames);
      }
    } else {
      const setChUsernames: Set<string> = new Set();
      setChUsernames.add(data.value.username);
      chUsers.set(data.eventId, setChUsernames);
    }
    if (data.eventId == this.curEventId) {
      ++this.usersChTracker;
    }
  }

  @Mutation
  setUsersInfoInMap(data: EventUsers) {
    if (data == null) {
      return;
    }
    const setChUsernames: Set<string> = new Set();
    for (const user of data.value) {
      allUsers.set(user.username, user);
      setChUsernames.add(user.username);
    }
    chUsers.set(data.eventId, setChUsernames);
    if (data.eventId == this.curEventId) {
      ++this.usersChTracker;
    }
  }

  @Mutation
  setStreamSubscription(data: { id: string; sub: ISubscription }) {
    const m = chSubs.get(data.id);
    if (m != undefined) {
      chSubs.set(data.id, {
        event: data.sub,
        device: m.device,
        rescuer: m.rescuer,
        users: m.users,
        discussion: m.discussion
      });
    }
    //++this.aedEventChannelTracker;
  }

  @Mutation
  setDeviceStreamSubscription(data: { id: string; sub: ISubscription }) {
    const m = chSubs.get(data.id);
    if (m != undefined) {
      chSubs.set(data.id, {
        event: m.event,
        device: data.sub,
        rescuer: m.rescuer,
        users: m.users,
        discussion: m.discussion
      });
    }
    //++this.aedEventChannelTracker;
  }

  @Mutation
  setRescuerStreamSubscription(data: { id: string; sub: ISubscription }) {
    const m = chSubs.get(data.id);
    if (m != undefined) {
      chSubs.set(data.id, {
        event: m.event,
        device: m.device,
        rescuer: data.sub,
        users: m.users,
        discussion: m.discussion
      });
    }
    //++this.aedEventChannelTracker;
  }

  @Mutation
  setUsersStreamSubscription(data: { id: string; sub: ISubscription }) {
    const m = chSubs.get(data.id);
    if (m != undefined) {
      chSubs.set(data.id, {
        event: m.event,
        device: m.device,
        rescuer: m.rescuer,
        users: data.sub,
        discussion: m.discussion
      });
    }
  }

  @Mutation
  setDiscussionStreamSubscription(data: { id: string; sub: ISubscription }) {
    const m = chSubs.get(data.id);
    if (m != undefined) {
      chSubs.set(data.id, {
        event: m.event,
        device: m.device,
        rescuer: m.rescuer,
        users: m.users,
        discussion: data.sub
      });
    }
  }

  @Mutation
  deleteEvOnMap(aedEventId: string) {
    chSubs.delete(aedEventId);
    ++this.streamSubscriptionTracker;
  }

  @Mutation
  setAedDeviceSelected(aedDevice: IAedDevPreview) {
    this.aedDeviceSelected = aedDevice;
  }

  get aedEventMarker() {
    const tracker = this.aedEventChannelTracker;
    return function(aedEventId: string) {
      const aedEvent: AedEventInfoDto | undefined = findElemOnChMap(
        aedEventId,
        evMap,
        tracker
      );
      return aedEvent
        ? latLng(aedEvent.occurrencePoint.y, aedEvent.occurrencePoint.x)
        : latLng(0, 0);
    };
  }

  get fetchUserAvatar() {
    const tracker = this.usersChTracker;
    return function(username: string) {
      return allUsers.get(username)!.avatar;
    };
  }

  get fetchUser() {
    const tracker = this.usersChTracker;
    return function(username: string) {
      return allUsers.get(username);
    };
  }

  get potentialAedDevices() {
    return function(aedEventId: string) {
      return findElemOnChMap(aedEventId, tempDevEvMap, 1);
    };
  }

  get hasAedEvChannel() {
    return function(aedEventId: string) {
      return chSubs.has(aedEventId);
    };
  }

  get aedEvent() {
    const tracker = this.aedEventChannelTracker;
    return function(aedEventId: string) {
      const eventInfoDto = findElemOnChMap(aedEventId, evMap, tracker);
      return eventInfoDto ? eventInfoDto : "";
    };
  }

  get channelsSubscription() {
    return function(aedEventId: string) {
      return chSubs.get(aedEventId);
    };
  }

  @Action({ commit: "setPreviewAedDevices" })
  async fetchAedDeviceInAreaPreview(data: {
    locale: string;
    dto: AedDeviceAreaLookWithRoute;
  }): Promise<DevRoutesResult> {
    return getAccessTokenJwt().then(token => {
      return new Promise(resolve => {
        const deviceRouteResults: AedDevicePreviewWithRouteDto[] = [];
        aedRSocketApi().then(aedRSocket => {
          aedRSocket
            .requestStream({
              data: dataBuf(data.dto),
              metadata: metadataBuf(
                token,
                aedDeviceApi.devicesAreaAvailableWRoute
              )
            })
            .subscribe({
              onNext: value => deviceRouteResults.push(bufToJson(value)),
              onError: error => console.error(error),
              onComplete: () =>
                resolve({ locale: data.locale, devRoutes: deviceRouteResults }),
              onSubscribe: sub => sub.request(20)
            });
        });
      });
    });
  }

  @Action({ commit: "setAedEventInfo" })
  async findEventId(data: EventDto) {
    //TODO check if user is subscribed and if there's already a value in evMap, then set evMap's event
    return chSubs.has(data.id) && evMap.has(data.id)
      ? evMap.get(data.id)
      : rSocketResponse(data, eventApi.findEventId);
  }

  @Action({ commit: "setFetchedCommentsInMap" })
  async fetchEventComments(
    data: AedCommentReqDto
  ): Promise<AedCommentsResDto | null> {
    if (chDisc.has(data.eventId)) {
      const map = chDisc.get(data.eventId)!;
      if (map.has(data.pageOffset)) {
        return null;
      }
    }
    return new Promise(resolve => {
      const result: AedComment[] = [];
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestStream({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, eventApi.aedEventFetchComments)
          })
          .subscribe({
            onNext: value => result.push(bufToJson(value)),
            onError: error => console.error(error),
            onComplete: () =>
              resolve({
                pageOffset: data.pageOffset,
                comments: result
              }),
            onSubscribe: sub => sub.request(50)
          })
      );
    });
  }

  @Action
  async listenEvent(data: EventDto) {
    if (checkChCtrl(data.id, "evSub")) {
      setChCtrl(data.id, { prop: "evSub", val: true });
      await rSocketChannelStream({
        eventDto: data,
        iSub: { name: "event", sub: this.channelsSubscription(data.id) },
        commit: this.context.commit,
        mut: {
          rSocketUrl: eventApi.aedEventListenSub,
          mapMut: "setAedEventInfo",
          subMut: "setStreamSubscription"
        }
      });
    }
  }

  @Action
  async listenDeviceSub(data: EventDto) {
    if (checkChCtrl(data.id, "devSub")) {
      setChCtrl(data.id, { prop: "devSub", val: true });
      await rSocketChannelStream({
        eventDto: data,
        iSub: { name: "device", sub: this.channelsSubscription(data.id) },
        commit: this.context.commit,
        mut: {
          rSocketUrl: eventApi.aedDeviceListenSub,
          mapMut: "setAedDeviceInfo",
          subMut: "setDeviceStreamSubscription"
        }
      });
    }
  }

  @Action
  async listenDiscussionSub(data: EventDto) {
    if (checkChCtrl(data.id, "discSub")) {
      setChCtrl(data.id, { prop: "discSub", val: true });
      await rSocketChannelStream({
        eventDto: data,
        iSub: { name: "discussion", sub: this.channelsSubscription(data.id) },
        commit: this.context.commit,
        mut: {
          rSocketUrl: eventApi.aedDiscussionListenSub,
          mapMut: "setLiveCommentInMapDiscussion",
          subMut: "setUsersStreamSubscription"
        }
      });
    }
  }

  @Action
  async listenUsersSub(data: EventDto) {
    if (checkChCtrl(data.id, "usersSub")) {
      setChCtrl(data.id, { prop: "usersSub", val: true });
      await rSocketChannelStream({
        eventDto: data,
        iSub: { name: "users", sub: this.channelsSubscription(data.id) },
        commit: this.context.commit,
        mut: {
          rSocketUrl: eventApi.aedEventUsersListenSub,
          mapMut: "setUserInfoInMap",
          subMut: "setDiscussionStreamSubscription"
        }
      });
    }
  }

  @Action
  async listenRescuerSub(data: EventDto) {
    if (checkChCtrl(data.id, "rescuerSub")) {
      setChCtrl(data.id, { prop: "rescuerSub", val: true });
      await rSocketChannelStream({
        eventDto: data,
        iSub: { name: "rescuer", sub: this.channelsSubscription(data.id) },
        commit: this.context.commit,
        mut: {
          rSocketUrl: eventApi.rescuerListenSub,
          mapMut: "setRescuerInfo",
          subMut: "setRescuerStreamSubscription"
        }
      });
    }
  }

  @Action({ commit: "setDeviceAndRescuer" })
  async fetchDeviceAndRescuer(data: { aedDeviceId: string }) {
    if (
      rescuerEvMap.has(data.aedDeviceId) &&
      devEvMap.has(data.aedDeviceId) &&
      chSubs.has(data.aedDeviceId)
    ) {
      this.context.commit("setDeviceAndRescuer2", {
        rescuer: rescuerEvMap.get(data.aedDeviceId),
        device: devEvMap.get(data.aedDeviceId)
      });
      return null;
    }
    return new Promise(resolve => {
      const result: AedDeviceRescuer[] = [];
      aedRSocketApi().then(aedRSocket => aedRSocket
          .requestStream({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, eventApi.fetchDeviceAndRescuer)
          })
          .subscribe({
            onNext: value => result.push(bufToJson(value)),
            onError: error => console.error(error),
            onComplete: () => resolve(result.pop()),
            onSubscribe: sub => sub.request(1)
          })
      );
    });
  }

  @Action({ commit: "setUsersInfoInMap" })
  async fetchEventUsers(data: EventDto) {
    if (chUsers.has(data.id)) {
      return;
    }
    return rSocketResponse(data, eventApi.aedEventPreviewUsers).then(
      (value: any) => {
        return {
          eventId: data.id,
          value: value.users
        };
      }
    );
  }

  @Action
  async postAedComment(data: AedEventCommentDto) {
    return rSocketResponse(data, eventApi.aedEventPostComment);
  }

  @Action({ commit: "setAedEventInfo" })
  async subRescuer(data: AedEventRescuerInfo) {
    tempDevEvMap.delete(data.id);
    this.context.commit("setPreviewDevices", []);
    if (data.aedDevicePreview !== undefined) {
      devEvMap.set(data.id, data.aedDevicePreview);
      this.context.commit("setSelectedDevice", data.aedDevicePreview);
    }
    return rSocketResponse(data, eventApi.subRescuer);
  }

  @Action
  async closeAedEvent(data: AedEventCloseInfo) {
    return rSocketResponse(data, eventApi.closeAedEvent);
  }
}

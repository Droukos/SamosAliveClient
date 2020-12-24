import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import {
  AedEventCloseInfo,
  AedEventInfoDto,
  AedEventRescuerInfo,
  EventDto
} from "@/types/aed-event";
import { accessToken, aedRSocketApi, getAccessTokenJwt } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { aedDeviceApi, eventApi, osmApi } from "@/plugins/api/api-urls";
import L, {latLng, LatLng} from "leaflet";
import { ISubscription } from "rsocket-types";
import { IAedDevicePreview } from "@/types/aed-device";
import { OsrmWaypointsExtra, ResponseRouteInfo } from "@/types/osm";
import { convertRoute } from "@/plugins/geolocation/routing_machine/osrm.ts";

const evMap: Map<string, AedEventInfoDto> = new Map<string, AedEventInfoDto>();
const subsChMap: Map<string, ISubscription> = new Map<string, ISubscription>();
const waypointDevToEvCache: Map<string, ResponseRouteInfo> = new Map<
  string,
  ResponseRouteInfo
>();

//function findEventProp(
//  aedEventId: string,
//  property: keyof AedEventInfoDto,
//  tracker: number
//) {
//  const elem = evMap.get(aedEventId);
//  if (tracker == 0 || aedEventId == "") return "";
//  else if (elem) return elem[property];
//}

function findAedEvent(aedEventId: string, tracker: number) {
  const elem = evMap.get(aedEventId);
  if (tracker == 0 || aedEventId == "") return undefined;
  else return elem;
}

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "aedEventChannelSub"
})
export default class AedEventChannelsSub extends VuexModule {
  aedEventChannelTracker = 0;
  streamSubscriptionTracker = 0;
  previewAedDevices: IAedDevicePreview[] = [];
  showPreviewAedDevices: IAedDevicePreview[] = [];
  aedDeviceSelected!: IAedDevicePreview;
  selectedRouteInfo: ResponseRouteInfo | undefined = {
    coordinates: [],
    instructions: [],
    name: "",
    summary: {
      totalDistance: 0,
      totalTime: 0
    },
    waypointIndices: []
  };
  rescuerPosition: LatLng | null = null;
  verifiedPosition = false;

  @Mutation
  setShowPreviewAedDevice(previewAedDevices: IAedDevicePreview[]) {
    this.showPreviewAedDevices = previewAedDevices;
  }

  @Mutation
  setRescuerPos(data: LatLng) {
    this.rescuerPosition = data;
  }

  @Mutation
  verifyRescuerPos(verify: boolean) {
    this.verifiedPosition = verify;
  }

  @Mutation
  setRescuerPos2(data: Position) {
    this.rescuerPosition = latLng(data.coords.latitude, data.coords.longitude);
  }

  @Mutation
  setPreviewAedDevices(previewAedDevices: IAedDevicePreview[]) {
    this.previewAedDevices = previewAedDevices;
    this.showPreviewAedDevices = previewAedDevices;
  }

  @Mutation
  setAedEventInfo(data: AedEventInfoDto) {
    evMap.set(data.id, data);
    ++this.aedEventChannelTracker;
  }

  @Mutation
  setStreamSubscription(data: { id: string; sub: ISubscription }) {
    subsChMap.set(data.id, data.sub);
    ++this.aedEventChannelTracker;
  }

  @Mutation
  deleteEvOnMap(aedEventId: string) {
    subsChMap.delete(aedEventId);
    ++this.streamSubscriptionTracker;
  }

  @Mutation
  setAedDeviceSelected(aedDevice: IAedDevicePreview) {
    this.aedDeviceSelected = aedDevice;
  }

  @Mutation
  setOsrmHints(data: {
    aedDeviceId: string;
    aedEventId: string;
    responseRoute: ResponseRouteInfo;
  }) {
    if (data.responseRoute == undefined) {
      this.selectedRouteInfo = waypointDevToEvCache.get(
        data.aedEventId + "@" + data.aedDeviceId
      );
      return;
    } else {
      waypointDevToEvCache.set(
        data.aedEventId + "@" + data.aedDeviceId,
        data.responseRoute
      );
      this.selectedRouteInfo = data.responseRoute;
      for (let i = 0; i < this.previewAedDevices.length; i++) {
        if (this.previewAedDevices[i].id == data.aedDeviceId) {
          this.previewAedDevices[i] = {
            id: this.previewAedDevices[i].id,
            modelName: this.previewAedDevices[i].modelName,
            homePoint: this.previewAedDevices[i].homePoint,
            uniqueNickname: this.previewAedDevices[i].uniqueNickname,
            onUserId: this.previewAedDevices[i].onUserId,
            onEventId: this.previewAedDevices[i].onEventId,
            description: this.previewAedDevices[i].description,
            address: this.previewAedDevices[i].address,
            status: this.previewAedDevices[i].status,
            picUrl: this.previewAedDevices[i].picUrl,
            responseRouteInfo: data.responseRoute
          };
          break;
        }
      }
      this.previewAedDevices.sort((a,b) => {
        if(a.responseRouteInfo == undefined && b.responseRouteInfo ==undefined) return 0;
        else if(a.responseRouteInfo == undefined) return -1;
        else if(b.responseRouteInfo == undefined) return 1;
        else if(a.responseRouteInfo.summary.totalDistance > b.responseRouteInfo.summary.totalDistance) return 1;
        else if(a.responseRouteInfo.summary.totalDistance < b.responseRouteInfo.summary.totalDistance) return -1;
        else return 0;
      });
    }
  }

  get aedEventMarker() {
    const tracker = this.aedEventChannelTracker;
    return function(aedEventId: string) {
      const aedEvent: AedEventInfoDto | undefined = findAedEvent(
        aedEventId,
        tracker
      );
      return aedEvent
        ? L.latLng(aedEvent.occurrencePoint.y, aedEvent.occurrencePoint.x)
        : L.latLng(0, 0);
    };
  }

  get selectedAedDevice() {
    return this.aedDeviceSelected;
  }

  get hasAedEvChannel() {
    return function(aedEventId: string) {
      return subsChMap.has(aedEventId);
    };
  }

  get aedEvent() {
    const tracker = this.aedEventChannelTracker;
    return function(aedEventId: string) {
      const eventInfoDto = findAedEvent(aedEventId, tracker);
      return eventInfoDto ? eventInfoDto : "";
    };
  }

  get aedEventStreamSubscription() {
    return function(aedEventId: string) {
      return subsChMap.get(aedEventId);
    };
  }

  get mapSearchDto() {
    return function(aedEventId: string) {
      const event: AedEventInfoDto | undefined = evMap.get(aedEventId);
      return {
        x: event!.occurrencePoint.x,
        y: event!.occurrencePoint.y,
        distance: 4
      };
    };
    //const :LatLng = this.aedEventStreamSubscription()
    //return {
    //  y: this.marker.lat,
    //  x: this.marker.lng,
    //  distance: this.radiusSlider
    //}
  }

  @Action({ commit: "setPreviewAedDevices" })
  async fetchAedDeviceInAreaPreview(
    aedEventId: string
  ): Promise<IAedDevicePreview[]> {
    return new Promise(resolve => {
      const prDevices: IAedDevicePreview[] = [];
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
          .requestStream({
            data: dataBuf(this.mapSearchDto(aedEventId)),
            metadata: metadataBuf(
              accessToken,
              aedDeviceApi.fetchAedDeviceInAreaAvailable
            )
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => prDevices.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(20)
          });
        resolve(prDevices);
      });
    });
  }

  @Action({ commit: "setOsrmHints" })
  async findWaypointInRescuerToDeviceToEvent(data: OsrmWaypointsExtra) {
    if (waypointDevToEvCache.has(data.aedEventId + "@" + data.aedDeviceId)) {
      return {
        aedEventId: data.aedEventId,
        aedDeviceId: data.aedDeviceId
      };
    }
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, osmApi.osrmSearchWaypoints)
          })
          .subscribe({
            onComplete: value =>
              resolve({
                aedEventId: data.aedEventId,
                aedDeviceId: data.aedDeviceId,
                responseRoute: convertRoute(bufToJson(value).routes[0], data.locale)
              }),
            onError: error => console.error(error)
          })
      );
    });
  }

  @Action({ commit: "setAedEventInfo" })
  async findEventId(data: EventDto) {
    return getAccessTokenJwt().then(token => {
      return new Promise(resolve => {
        aedRSocketApi().then(aedRSocket =>
          aedRSocket
            .requestResponse({
              data: dataBuf(data),
              metadata: metadataBuf(token, eventApi.findEventId)
            })
            .subscribe({
              onComplete: value => resolve(bufToJson(value)),
              onError: error => console.error(error)
            })
        );
      });
    });
  }

  @Action
  async listenEvent(data: EventDto) {
    const requestedMsg = 10;
    let processedMsg = 0;

    aedRSocketApi().then(aedRSocket =>
      aedRSocket
        .requestStream({
          data: dataBuf(data),
          metadata: metadataBuf(accessToken, eventApi.aedEventListenSub)
        })
        .subscribe({
          onError: error => console.error(error),
          onNext: payload => {
            processedMsg++;

            const aedEventInfoDto: AedEventInfoDto = bufToJson(payload);
            if (processedMsg >= requestedMsg) {
              this.aedEventStreamSubscription(aedEventInfoDto.id)!.request(
                requestedMsg
              );
              processedMsg = 0;
            }
            //console.log(aedEventInfoDto);

            this.context.commit("setAedEventInfo", aedEventInfoDto);
          },
          onSubscribe: sub => {
            this.context.commit("setStreamSubscription", {
              id: data.id,
              sub: sub
            });
            sub.request(requestedMsg);
          }
        })
    );
  }

  @Action({ commit: "setAedEventInfo" })
  async subRescuer(data: AedEventRescuerInfo) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, eventApi.subRescuer)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.error(error)
          })
      );
    });
  }

  @Action
  async closeAedEvent(data: AedEventCloseInfo) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, eventApi.closeAedEvent)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.error(error)
          })
      );
    });
  }

  //@Mutation
  //setStatusOnProgress() {
  //  this.status = statusOptions.ONPROGRESS;
  //}
  //
  //@Mutation
  //setEventCompleted(data: AedEventComplete) {
  //  this.status = statusOptions.COMPLETED;
  //  this.completedTime = data.completedTime;
  //  this.rescuer = data.rescuer;
  //  this.conclusion = data.conclusion;
  //}
}

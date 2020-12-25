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
import { aedDeviceApi, eventApi } from "@/plugins/api/api-urls";
import L, { latLng, LatLng } from "leaflet";
import { ISubscription } from "rsocket-types";
import { IAedDevPreview } from "@/types/aed-device";
import {
  AedDeviceAreaLookWithRoute,
  AedDevicePreviewWithRouteDto,
  DevRoutesResult,
  RouteInfo
} from "@/types/osm";
import { convertRoute } from "@/plugins/geolocation/osrm.ts";
import { PreviewUser } from "@/types";
import { emptyRouteInfo, sortAedDevices } from "@/plugins/osm-util";

const evMap: Map<string, AedEventInfoDto> = new Map<string, AedEventInfoDto>();
//const routeEvMap: Map<string, RouteInfo> = new Map<string, RouteInfo>();
const rescuerEvMap: Map<string, PreviewUser> = new Map<string, PreviewUser>();
const devEvMap: Map<string, IAedDevPreview> = new Map<string, IAedDevPreview>();
const subsChMap: Map<string, ISubscription> = new Map<string, ISubscription>();
const routeDevsToEvMap: Map<string, IAedDevPreview[]> = new Map<
  string,
  IAedDevPreview[]
>();

function findElemOnChMap(
  aedEventId: string,
  map: Map<string, any>,
  tracker: number
) {
  const elem = map.get(aedEventId);
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
  routeChTracker = 0;
  rescuerChTracker = 0;
  devChTracker = 0;

  previewAedDevices: IAedDevPreview[] = [];
  showPreviewAedDevices: IAedDevPreview[] = [];
  aedDeviceSelected: IAedDevPreview | null = null;
  selectedRouteInfo: RouteInfo | null | undefined = emptyRouteInfo();
  selectedRescuer: PreviewUser | null = null;
  rescuerPosition: LatLng | null = null;
  verifiedPosition = false;
  onMapDialog = false;

  @Mutation
  setMapDialog(bool: boolean) {
    this.onMapDialog = bool;
  }

  @Mutation
  setPreviewDevices(data: IAedDevPreview[]) {
    this.previewAedDevices = data;
    this.showPreviewAedDevices = data;
  }

  @Mutation
  setSelectedDevice(data: IAedDevPreview) {
    this.aedDeviceSelected = data;
    if(data.responseRouteInfo !== undefined){
      this.selectedRouteInfo = data.responseRouteInfo;
    }
  }

  @Mutation
  initChannelData(aedEventId: string) {
    if (routeDevsToEvMap.has(aedEventId)) {
      this.previewAedDevices = [...routeDevsToEvMap.get(aedEventId)!.values()];
      this.verifiedPosition = false;
      this.selectedRouteInfo = emptyRouteInfo();
      this.aedDeviceSelected = null;
      this.selectedRescuer = null;
    } else if (devEvMap.has(aedEventId)) {
      this.aedDeviceSelected = devEvMap.get(aedEventId)!;
      this.selectedRouteInfo = this.aedDeviceSelected.responseRouteInfo;
      this.selectedRescuer = rescuerEvMap.get(aedEventId)!;
      this.previewAedDevices = [this.aedDeviceSelected];
      this.verifiedPosition = true;
    } else {
      this.previewAedDevices = [];
      this.verifiedPosition = false;
      this.selectedRouteInfo = emptyRouteInfo();
      this.selectedRescuer = null;
      this.aedDeviceSelected = null;
    }
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
    routeDevsToEvMap.set(aedEventId, this.showPreviewAedDevices);
    this.previewAedDevices = this.showPreviewAedDevices;
    sortAedDevices(this.previewAedDevices);
  }

  @Mutation
  setAedEventInfo(data: AedEventInfoDto) {
    //routeDevsToEvMap.delete(data.id);
    //this.previewAedDevices = [];
    //this.showPreviewAedDevices = [];
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
        ? L.latLng(aedEvent.occurrencePoint.y, aedEvent.occurrencePoint.x)
        : L.latLng(0, 0);
    };
  }

  get potentialAedDevices() {
    return function(aedEventId: string) {
      return findElemOnChMap(aedEventId, routeDevsToEvMap, 1);
    };
  }

  get hasAedEvChannel() {
    return function(aedEventId: string) {
      return subsChMap.has(aedEventId);
    };
  }

  get aedEvent() {
    const tracker = this.aedEventChannelTracker;
    return function(aedEventId: string) {
      const eventInfoDto = findElemOnChMap(aedEventId, evMap, tracker);
      return eventInfoDto ? eventInfoDto : "";
    };
  }

  get aedEventStreamSubscription() {
    return function(aedEventId: string) {
      return subsChMap.get(aedEventId);
    };
  }

  @Action({ commit: "setPreviewAedDevices" })
  async fetchAedDeviceInAreaPreview(
    data: {
      locale: string,
      dto: AedDeviceAreaLookWithRoute
    }
  ): Promise<DevRoutesResult> {
    return getAccessTokenJwt().then(token => {
      return new Promise(resolve => {
        const deviceRouteResults: AedDevicePreviewWithRouteDto[] = [];

        aedRSocketApi().then(aedRSocket => {
          aedRSocket
            .requestStream({
              data: dataBuf(data.dto),
              metadata: metadataBuf(
                token,
                aedDeviceApi.fetchAedDeviceInAreaAvailableWithRouteInfo
              )
            })
            .subscribe({
              onNext: value => {
                //console.log(bufToJson(value));
                deviceRouteResults.push(bufToJson(value));
              },
              onError: error => console.error(error),
              onComplete: () =>
                resolve({
                  locale: data.locale,
                  devRoutes: deviceRouteResults
                }),
              onSubscribe: sub => sub.request(20)
            });
        });
      });
    });
  }

  @Action({ commit: "setSelectedDevice" })
  async findAedDeviceById(aedDeviceId: string) {
    return getAccessTokenJwt().then(token => {
      return new Promise(resolve => {
        aedRSocketApi().then(aedRSocket => {
          aedRSocket
            .requestResponse({
              data: dataBuf({ id: aedDeviceId }),
              metadata: metadataBuf(token, aedDeviceApi.fetchAedDevice)
            })
            .subscribe({
              onComplete: value => resolve(bufToJson(value)),
              onError: error => console.log(error)
            });
        });
      });
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
            onComplete: value => {
              routeDevsToEvMap.delete(data.id);
              this.context.commit("setPreviewDevices", []);
              if (data.aedDevicePreview !== undefined) {
                devEvMap.set(data.id, data.aedDevicePreview);
                this.context.commit("setSelectedDevice", data.aedDevicePreview);
              }
              resolve(bufToJson(value));
            },
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

  //get mapSearchDto() {
  //  return function(aedEventId: string) {
  //    const event: AedEventInfoDto | undefined = evMap.get(aedEventId);
  //    return {
  //      x: event!.occurrencePoint.x,
  //      y: event!.occurrencePoint.y,
  //      distance: 4
  //    };
  //  };
  //  //const :LatLng = this.aedEventStreamSubscription()
  //  //return {
  //  //  y: this.marker.lat,
  //  //  x: this.marker.lng,
  //  //  distance: this.radiusSlider
  //  //}
  //}

  //@Action({ commit: "setPreviewAedDevices" })
  //async fetchAedDeviceInAreaPreview(
  //    aedEventId: string
  //): Promise<IAedDevPreview[]> {
  //  return new Promise(resolve => {
  //    const prDevices: IAedDevPreview[] = [];
  //    aedRSocketApi().then(aedRSocket => {
  //      aedRSocket
  //          .requestStream({
  //            data: dataBuf(this.mapSearchDto(aedEventId)),
  //            metadata: metadataBuf(
  //                accessToken,
  //                aedDeviceApi.fetchAedDeviceInAreaAvailable
  //            )
  //          })
  //          .subscribe({
  //            onError: error => console.error(error),
  //            onNext: payload => prDevices.push(bufToJson(payload)),
  //            onSubscribe: sub => sub.request(20)
  //          });
  //      resolve(prDevices);
  //    });
  //  });
  //}

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

  //@Mutation
  //setOsrmHints(data: RouteResult) {
  //  if (data.responseRoute == undefined) {
  //    this.selectedRouteInfo = routeDevsToEvMap.get(
  //      routeDevEvKey(data)
  //    )!.routeInfo;
  //    return;
  //  } else {
  //    routeDevsToEvMap.get(routeDevEvKey(data))!.routeInfo = data.responseRoute;
  //    this.selectedRouteInfo = data.responseRoute;
  //for (let i = 0; i < this.previewAedDevices.length; i++) {
  //  if (this.previewAedDevices[i].id == data.aedDeviceId) {
  //    this.previewAedDevices[i] = {
  //      id: this.previewAedDevices[i].id,
  //      modelName: this.previewAedDevices[i].modelName,
  //      homePoint: this.previewAedDevices[i].homePoint,
  //      uniqueNickname: this.previewAedDevices[i].uniqueNickname,
  //      onUserId: this.previewAedDevices[i].onUserId,
  //      onEventId: this.previewAedDevices[i].onEventId,
  //      description: this.previewAedDevices[i].description,
  //      address: this.previewAedDevices[i].address,
  //      status: this.previewAedDevices[i].status,
  //      picUrl: this.previewAedDevices[i].picUrl,
  //      responseRouteInfo: data.responseRoute
  //    };
  //    break;
  //  }
  //}
  //  }
  //}

  //  @Action({ commit: "setOsrmHints" })
  //  async findWaypointInRescuerToDeviceToEvent(data: OsrmWaypointsExtra) {
  //    if (routeDevsToEvMap.has(data.aedEventId + "@" + data.aedDeviceId)) {
  //      return {
  //        aedEventId: data.aedEventId,
  //        aedDeviceId: data.aedDeviceId
  //      };
  //    }
  //    return new Promise(resolve => {
  //      aedRSocketApi().then(aedRSocket =>
  //        aedRSocket
  //          .requestResponse({
  //            data: dataBuf(data),
  //            metadata: metadataBuf(accessToken, osmApi.osrmSearchWaypoints)
  //          })
  //          .subscribe({
  //            onComplete: value =>
  //              resolve({
  //                aedEventId: data.aedEventId,
  //                aedDeviceId: data.aedDeviceId,
  //                responseRoute: convertRoute(
  //                  bufToJson(value).routes[0],
  //                  data.locale
  //                )
  //              }),
  //            onError: error => console.error(error)
  //          })
  //      );
  //    });
  //  }
}

import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import {
  AedEventCloseInfo,
  AedEventInfoDto,
  AedEventRescuerInfo,
  EventDto
} from "@/types/aed-event";
import { accessToken, aedRSocketApi, getAccessTokenJwt } from "@/plugins/api";
import {
  bufToJson,
  dataBuf,
  metadataBuf
} from "@/plugins/api/rsocket-util";
import { eventApi } from "@/plugins/api/api-urls";
import L from "leaflet";
import { ISubscription } from "rsocket-types";

const evMap: Map<string, AedEventInfoDto> = new Map<string, AedEventInfoDto>();
const subsChMap: Map<string, ISubscription> = new Map<string, ISubscription>();

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

  get hasAedEvChannel() {
    return function(aedEventId: string) {
      return subsChMap.has(aedEventId) ;
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

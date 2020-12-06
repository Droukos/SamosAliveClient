import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { AedEventCardDto, AedSearchInfo } from "@/types/aed-event";
import { aedRSocketApi, getAccessTokenJwt } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { eventApi } from "@/plugins/api/api-urls";
import { statusOptions } from "@/plugins/enums/event-options";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "eventList"
})
export default class EventList extends VuexModule {
  previewEvents = new Map<string, AedEventCardDto>();
  previewEventsShow: AedEventCardDto[] = [];
  selectedType = 0;
  selectedStatus = 0;
  listenToAedEvents = true;

  @Mutation
  setSinglePreviewEvent(payload: AedEventCardDto) {
    if (
      payload.status !== statusOptions.PENDING &&
      this.previewEvents.has(payload.id)
    ) {
      this.previewEvents.delete(payload.id);
    } else {
      this.previewEvents.set(payload.id, payload);
    }
    this.previewEventsShow = Array.from(this.previewEvents.values()).reverse();
  }

  get allAedEvents() {
    return this.previewEventsShow;
  }

  @Action
  async fetchEventsPreview(data: AedSearchInfo) {
    getAccessTokenJwt().then(token => {
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
          .requestStream({
            data: dataBuf(data),
            metadata: metadataBuf(token, eventApi.findOccurrenceType)
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload =>
              this.context.commit("setSinglePreviewEvent", bufToJson(payload)),
            onSubscribe: sub => sub.request(20)
          });
      });
    });
  }

  @Action
  async listenEvents() {
    if (!this.listenToAedEvents) {
      return;
    }
    const requestedMsg = 10;
    let processedMsg = 0;
    let requestStreamSubscription: any;
    getAccessTokenJwt().then(token => {
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
          .requestStream({
            metadata: metadataBuf(token, eventApi.aedEventsListen)
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => {
              processedMsg++;

              if (processedMsg >= requestedMsg) {
                requestStreamSubscription.request(requestedMsg);
                processedMsg = 0;
              }
              console.log(bufToJson(payload));
              this.context.commit("setSinglePreviewEvent", bufToJson(payload));
            },
            onSubscribe: sub => {
              requestStreamSubscription = sub;
              requestStreamSubscription.request(requestedMsg);
            }
          });
      });
    });
  }
}

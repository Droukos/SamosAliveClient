import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { AedEventCardDto } from "@/types/aed-event";
import { statusOptions } from "@/plugins/enums/event-options";
import { aedRSocketApi, getAccessTokenJwt } from "@/plugins/api";
import { bufToJson, metadataBuf } from "@/plugins/api/rsocket-util";
import { eventApi } from "@/plugins/api/api-urls";
import { ISubscription } from "rsocket-types";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "eventLiveList"
})
export default class EventLiveList extends VuexModule {
  previewEvents = new Map<string, AedEventCardDto>();
  previewEventsShow: AedEventCardDto[] = [];
  fetchedAll = false;
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

  @Mutation
  setPreviewEvents() {
    this.fetchedAll = true;
  }

  get allAedEvents() {
    return this.previewEventsShow;
  }

  @Action({commit: "setPreviewEvents"})
  async fetchUnassignedEventsPreview() {
    if (this.fetchedAll) {
      return;
    }
    return getAccessTokenJwt().then(token => {
      return new Promise(resolve => {
        aedRSocketApi().then(aedRSocket => {
          aedRSocket
            .requestStream({
              metadata: metadataBuf(token, eventApi.aedEventsFetchUnassigned)
            })
            .subscribe({
              onError: error => console.error(error),
              onNext: payload =>
                this.context.commit(
                  "setSinglePreviewEvent",
                  bufToJson(payload)
                ),
              onSubscribe: sub => sub.request(20),
              onComplete: () => resolve()
            });
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
    let requestStreamSubscription: ISubscription;
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

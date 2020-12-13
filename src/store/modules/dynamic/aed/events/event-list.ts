import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { AedEventCardDto, AedSearchInfo } from "@/types/aed-event";
import { aedRSocketApi, getAccessTokenJwt } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { eventApi } from "@/plugins/api/api-urls";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "eventList"
})
export default class EventList extends VuexModule {
  previewEventsShow: AedEventCardDto[] = [];
  selectedType = 1;
  selectedStatus = 1;

  @Mutation
  setType(type: number) {
    this.selectedType = type;
  }

  @Mutation
  setStatus(type: number) {
    this.selectedStatus = type;
  }

  @Mutation
  setPreviewEvents(data: AedEventCardDto[]) {
    this.previewEventsShow = data;
  }

  get allAedEvents() {
    return this.previewEventsShow;
  }

  @Action({ commit: "setPreviewEvents" })
  async fetchEventsPreview(data: AedSearchInfo) {
    return getAccessTokenJwt().then(token => {
      const result: AedEventCardDto[] = [];
      return new Promise(resolve => {
        aedRSocketApi().then(aedRSocket => {
          aedRSocket
            .requestStream({
              data: dataBuf(data),
              metadata: metadataBuf(token, eventApi.findOccurrenceType)
            })
            .subscribe({
              onError: error => console.error(error),
              onNext: payload => result.push(bufToJson(payload)),
              onSubscribe: sub => sub.request(20),
              onComplete: () => resolve(result)
            });
        });
      });
    });
  }
}

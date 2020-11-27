import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { AedEventInfo, AedSearchInfo } from "@/types";
import { accessToken, aedRSocketApi } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { eventApi } from "@/plugins/api/api-urls";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "eventList"
})
export default class EventList extends VuexModule {
  previewEvents: AedEventInfo[] | null = null;
  selectedType = 0;
  selectedStatus = 0;

  @Mutation
  setPreviewEvent(eventInfo: AedEventInfo[]) {
    this.previewEvents = eventInfo;
  }

  @Action({ commit: "setPreviewEvent" })
  async fetchEventsPreview(data: AedSearchInfo) {
    return new Promise(resolve => {
      const previewAedEvent: AedEventInfo[] = [];
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
          .requestStream({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, eventApi.findOccurrenceType)
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => previewAedEvent.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(20)
          });
        resolve(previewAedEvent);
      });
    });
  }
}

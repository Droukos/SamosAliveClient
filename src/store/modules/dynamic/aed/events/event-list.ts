import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { AedEventInfo, AedSearchInfo } from "@/types/aed-event";
import { accessToken, aedRSocketApi } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { eventApi } from "@/plugins/api/api-urls";
import {statusOptions} from "@/plugins/enums/event-options";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "eventList"
})
export default class EventList extends VuexModule {
  previewEvents = new Map<string, AedEventInfo>(); //AedEventInfo[] | null = null;
  selectedType = 0;
  selectedStatus = 0;

  updatePreviewEventMap(previewEventsMap: Map<string, AedEventInfo>, eventInfo: AedEventInfo) {
    if(eventInfo.status === statusOptions.COMPLETED && previewEventsMap.has(eventInfo.id)) {
      previewEventsMap.delete(eventInfo.id);
    }else {
      previewEventsMap.set(eventInfo.id, eventInfo)
    }
  }
  @Mutation
  setPreviewEvent(eventInfo: AedEventInfo[]) {
    eventInfo.forEach(value => this.updatePreviewEventMap(this.previewEvents, value))
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

  @Action
  async listenEvents() {
    //let requestedMsg = 10;
    //let processedMsg = 0;
    //let requestStreamSubscription: any ;
    aedRSocketApi().then(aedRSocket => {
      aedRSocket
          .requestStream({
            metadata: metadataBuf(
                accessToken,
                eventApi.aedEventsListen
            )
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => {
              //processedMsg++;

              //if (processedMsg >= requestedMsg) {
              //  requestStreamSubscription.request(requestedMsg);
              //  processedMsg = 0;
              //}
              console.log(bufToJson(payload))
              this.updatePreviewEventMap(this.previewEvents, bufToJson(payload))
              //this.events.push(bufToJson(payload));
            },
            onSubscribe: sub => {
              //requestStreamSubscription = sub;
              //requestStreamSubscription.request(requestedMsg);
              sub.request(60000)
            }
          });
    });
  }
}

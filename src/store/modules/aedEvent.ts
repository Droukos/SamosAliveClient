import {bufToJson, dataBuf, metadataOnlyRoute} from "@/plugins/api/rsocketUtil";
import {aedRSocketApi} from "@/plugins/api";
import { Action, Module, VuexModule } from "vuex-module-decorators";
import {eventApi} from "@/plugins/api/apiUrls";
import {AedEventInfo} from "@/types";
@Module({ namespaced: true })
export default class AedEvent extends VuexModule {
  @Action
  async createAedEvent(data: AedEventInfo) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
          aedRSocket.requestResponse({
            data: dataBuf(data),
            metadata: metadataOnlyRoute(eventApi.createEvent)
          })
              .subscribe({
                onComplete: value => resolve(bufToJson(value)),
                onError: error => console.error(error)
              }));
    });
  }
}
  //@Action
  //async createAedEvent(data: AedEventInfo) {
  //  return new Promise((resolve) => {
  //    aedRSocket
  //      .requestResponse({
  //        data: dataBuf(data),
  //        metadata: metadataBuf(accessToken, eventApi.createEvent),
  //      })
  //      .subscribe({
  //        onComplete: (value) => {
  //          resolve(bufToJson(value));
  //        },
  //        onError: (error) => {
  //          console.log(error);
  //        },
  //      });
  //  });
  //}

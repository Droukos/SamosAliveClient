import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { accessToken, aedRSocketApi } from "@/plugins/api";
import { Action, Module, VuexModule } from "vuex-module-decorators";
import { eventApi } from "@/plugins/api/api-urls";
import {
  AedEventInfo,
} from "@/types";
@Module({ namespaced: true })
export default class AedEvent extends VuexModule {

  @Action
  async createAedEvent(data: AedEventInfo) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, eventApi.createEvent)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.error(error)
          })
      );
    });
  }
}

import { bufToJson, dataBuf } from "@/plugins/api/rsocketUtil";
import { metadataBuf } from "@/plugins/api/rsocketUtil";
import { accessToken, aedRSocket } from "./../../plugins/api/index";
import { Action, Module, VuexModule } from "vuex-module-decorators";
import api from "@/plugins/api";
import { eventApi } from "@/plugins/api/apiUrls";
import { AedEventInfo } from "@/types";
@Module({ namespaced: true })
export default class AedEvent extends VuexModule {
  @Action
  async createAedEvent(data: AedEventInfo) {
    return new Promise((resolve) => {
      aedRSocket
        .requestResponse({
          data: dataBuf(data),
          metadata: metadataBuf(accessToken, eventApi.createEvent),
        })
        .subscribe({
          onComplete: (value) => {
            resolve(bufToJson(value));
          },
          onError: (error) => {
            console.log(error);
          },
        });
    });
  }
}

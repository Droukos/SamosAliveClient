import { Action, Module, VuexModule } from "vuex-module-decorators";
import api from "@/plugins/api";
import { eventApi } from "@/plugins/api/apiUrls";
import { AedEventInfo } from "@/types";
@Module({ namespaced: true })
export default class AedEvent extends VuexModule {
  @Action
  async createAedEvent(data: AedEventInfo) {
    return await api.post(eventApi.createEvent, data);
  }
}

//import api from "@/plugins/api";
import api from "@/plugins/api";
import { userApi } from "@/plugins/api/apiUrls.ts";
import { Action, Module, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true })
export default class Search extends VuexModule {
  @Action
  async fetchUsersPreview(user: string) {
    return await api.post(userApi.searchPreview, { user: user });
  }
}

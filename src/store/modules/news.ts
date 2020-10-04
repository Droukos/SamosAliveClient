import { Action, Module, VuexModule } from "vuex-module-decorators";
import api from "@/plugins/api";
import { newsApi } from "@/plugins/api/apiUrls";
import { NewsInfo } from "@/types";
@Module({ namespaced: true })
export default class News extends VuexModule {
  @Action({rawError: true})
  @Action
  async createNews(data: NewsInfo) {
    return await api.post(newsApi.createNews, data);
  }
}

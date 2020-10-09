//import api from "@/plugins/api";
import api from "@/plugins/api";
import { eventApi, newsApi, userApi, problemsApi } from "@/plugins/api/apiUrls.ts";
import { Action, Module, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true })
export default class Search extends VuexModule {
  @Action({ rawError: true })
  @Action
  async fetchUsersPreview(user: string) {
    return await api.post(userApi.searchPreview, { user: user });
  }
  @Action
  async fetchEventsPreview(occurrenceType: string) {
    return await api.post(eventApi.findOccurrenceType, { occurrenceType: occurrenceType});
  }

  @Action
  async fetchNewsPreview(newsTitle: string) {
    return await api.post(newsApi.findNews, { newsTitle: newsTitle });
  }

  @Action
  async fetchProblemsPreview(title: string) {
    return await api.post(problemsApi.findProblems, {title: title });
  }
}

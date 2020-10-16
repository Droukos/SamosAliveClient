//import api from "@/plugins/api";
import {userRSocket, accessToken} from "@/plugins/api";
import {userApi} from "@/plugins/api/apiUrls.ts";
import {Action, Module, VuexModule} from "vuex-module-decorators";
import {bufToJson, dataBuf, metadataBuf} from "@/plugins/api/rsocketUtil";
import {RequestedPreviewUser} from "@/types";
import api from "@/plugins/api";
import { eventApi, newsApi, userApi, problemsApi } from "@/plugins/api/apiUrls.ts";
import { Action, Module, VuexModule } from "vuex-module-decorators";

@Module({namespaced: true})
export default class Search extends VuexModule {

    @Action
    async fetchUsersPreview(user: string) {

        const prUsers: RequestedPreviewUser[] = [];
        userRSocket
            .requestStream({
                    data: dataBuf({ username: user }),
                    metadata: metadataBuf(accessToken, userApi.searchPreview)
                })
            .subscribe({
                onComplete: () => {
                    //console.log("got response with requestResponse");
                },
                onError: error => {
                    //console.log("got error with requestStream");
                    console.error(error);
                },
                onNext: payload => {
                    prUsers.push(JSON.parse(bufToJson(payload)))
                    //this.context.commit("addPreviewUser", JSON.parse(bufToJson(payload)));
                },
                onSubscribe: sub => {
                    sub.request(20);
                },
            });
        return prUsers;
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

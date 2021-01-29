import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { AedProblemsCardDto } from "@/types/aed-problems";
import { accessToken } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { problemsApi } from "@/plugins/api/api-urls";
import {aedRSocketApi} from "@/plugins/api/rsocket-api";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "problemsList"
})
export default class ProblemsList extends VuexModule {
  previewProblems: AedProblemsCardDto[] | null = null;
  problemsTitle = "";

  @Mutation
  setPreviewProblems(problemsInfo: AedProblemsCardDto[]) {
    this.previewProblems = problemsInfo;
  }

  @Action({ commit: "setPreviewProblems" })
  async fetchProblemsPreview(title: string) {
    return new Promise(resolve => {
      const previewAedProblems: AedProblemsCardDto[] = [];
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
          .requestStream({
            data: dataBuf({ problemsTitle: title }),
            metadata: metadataBuf(accessToken, problemsApi.findProblems)
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => previewAedProblems.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(20)
          });
        resolve(previewAedProblems);
      });
    });
  }
}

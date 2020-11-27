import { Action, Module, VuexModule } from "vuex-module-decorators";
import { accessToken, aedRSocketApi } from "@/plugins/api";
import { problemsApi } from "@/plugins/api/apiUrls";
import { AedProblemsInfo } from "@/types";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocketUtil";
@Module({ namespaced: true })
export default class AedProblems extends VuexModule {
  @Action
  async createAedProblems(data: AedProblemsInfo) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, problemsApi.createProblems)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.error(error)
          })
      );
    });
  }
}

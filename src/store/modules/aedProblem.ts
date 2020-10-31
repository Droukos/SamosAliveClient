import { Action, Module, VuexModule } from "vuex-module-decorators";
import { aedRSocketApi} from "@/plugins/api";
import { problemsApi} from "@/plugins/api/apiUrls";
import { AedProblemsInfo} from "@/types";
import {bufToJson, dataBuf, metadataOnlyRoute} from "@/plugins/api/rsocketUtil";
@Module({ namespaced: true })
export default class AedProblem extends VuexModule {
  @Action
  async createAedProblems(data: AedProblemsInfo) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
          aedRSocket.requestResponse({
            data: dataBuf(data),
            metadata: metadataOnlyRoute(problemsApi.createProblems)
          })
              .subscribe({
                onComplete: value => resolve(bufToJson(value)),
                onError: error => console.error(error)
              }));
    });
  }
}
//@Action
//async createAedProblems(data: AedProblemsInfo) {
//  return new Promise((resolve) => {
//    aedRSocket
//      .requestResponse({
//        data: dataBuf(data),
//        metadata: metadataBuf(accessToken, problemsApi.createProblems),
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
//

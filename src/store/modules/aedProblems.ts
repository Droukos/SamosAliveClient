import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { accessToken, aedRSocketApi } from "@/plugins/api";
import { problemsApi} from "@/plugins/api/apiUrls";
import {AedProblemsMore, AedProblemsInfo, ProblemsDto, AedProblemsTechnicalInfo} from "@/types";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocketUtil";
@Module({ namespaced: true })
export default class AedProblems extends VuexModule implements AedProblemsMore {
  id = "";
  username = "";
  problemsTitle = "";
  address = "";
  information = "";
  status = -1;
  uploadedTime = [0];

  @Mutation
  setAedProblemsInfo(data: AedProblemsMore) {
    this.id = data.id;
    this.username = data.username;
    this.problemsTitle = data.problemsTitle;
    this.address = data.address;
    this.information = data.information;
    this.status = data.status;
    this.uploadedTime = data.uploadedTime;
  }

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
  @Action({ commit: "setAedProblemsInfo" })
  async findProblemsId(data: ProblemsDto) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
          aedRSocket
              .requestResponse({
                data: dataBuf(data),
                metadata: metadataBuf(accessToken, problemsApi.findProblemsId)
              })
              .subscribe({
                onComplete: value => resolve(bufToJson(value)),
                onError: error => console.error(error)
              })
      );
    });
  }
  @Action
  async subTechnical(data: AedProblemsTechnicalInfo) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
          aedRSocket
              .requestResponse({
                data: dataBuf(data),
                metadata: metadataBuf(accessToken, problemsApi.subTechnical)
              })
              .subscribe({
                onComplete: value => resolve(bufToJson(value)),
                onError: error => console.error(error)
              })
      );
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

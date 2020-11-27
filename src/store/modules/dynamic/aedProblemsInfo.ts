import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import {
  AedProblemsCloseInfo,
  AedProblemsMore,
  AedProblemsTechnicalInfo,
  ProblemsDto
} from "@/types";
import { statusOptions } from "@/plugins/enums/event-options";
import { accessToken, aedRSocketApi } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { problemsApi } from "@/plugins/api/api-urls";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "aedProblemsInfo"
})
export default class AedProblemsInfo extends VuexModule
  implements AedProblemsMore {
  id = "";
  username = "";
  problemsTitle = "";
  address = "";
  information = "";
  status = statusOptions.UNKNOWN;
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

  @Mutation
  setStatusOnProgress() {
    this.status = statusOptions.ONPROGRESS;
  }

  @Mutation
  setStatusCompleted() {
    this.status = statusOptions.COMPLETED;
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
  @Action({ commit: "setStatusOnProgress" })
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
  @Action({ commit: "setStatusCompleted" })
  async closeAedProblems(data: AedProblemsCloseInfo) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, problemsApi.closeAedProblems)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.error(error)
          })
      );
    });
  }
}

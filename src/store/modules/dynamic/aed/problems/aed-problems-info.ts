import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import {
  AedProblemsCloseInfo,
  AedProblemsInfoDto,
  AedProblemsTechnicalInfo,
  ProblemsDto
} from "@/types/aed-problems";
import { statusOptions } from "@/plugins/enums/event-options";
import { accessToken, aedRSocketApi } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { problemsApi } from "@/plugins/api/api-urls";
import L from "leaflet";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "aedProblemsInfo"
})
export default class AedProblemsInfo extends VuexModule
  implements AedProblemsInfoDto {
  id = "";
  username = "";
  title = -1;
  body = "";
  point = { x: 0, y: 0 };
  aedDeviceId = "";
  address = "";
  status = statusOptions.UNKNOWN;
  uploadedTime = [0];
  completedTime = [0];
  technical = "";
  conclusion = "";

  dialog = false;

  zoom = 15.5;
  center = L.latLng(0, 0);
  marker = L.latLng(0, 0);

  @Mutation
  setDialog(dialog: boolean) {
    this.dialog = dialog;
  }

  @Mutation
  setAedProblemsInfo(data: AedProblemsInfoDto) {
    this.id = data.id;
    this.username = data.username;
    this.title = data.title;
    this.body = data.body;
    this.point = data.point;
    this.address = data.address;
    this.status = data.status;
    this.uploadedTime = data.uploadedTime;
    this.completedTime = data.completedTime;
    this.technical = data.technical;
    this.conclusion = data.conclusion;
    this.center = L.latLng(data.point.y, data.point.x);
    this.marker = L.latLng(data.point.y, data.point.x);
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

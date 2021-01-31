import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { accessToken } from "@/plugins/api";
import { problemsApi } from "@/plugins/api/api-urls";
import { AedProblemsCreateDto } from "@/types/aed-problems";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import store from "@/store";
import { FieldObject } from "@/types";
import i18n from "@/plugins/i18n";
import { aedRSocketApi } from "@/plugins/api/rsocket-api";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "aedProblemsCreate"
})
export default class AedProblemsCreate extends VuexModule {
  fTitle = 0;
  fBody: FieldObject = {
    f: i18n.t("problems.problemContent"),
    v: "",
    e: "",
    run: false
  };
  fAedDeviceId = "";

  createVisible = false;
  @Mutation
  setCreateVisible(createVisible: boolean) {
    this.createVisible = createVisible;
  }

  @Mutation
  setTitle(title: number) {
    this.fTitle = title;
    console.log(this.fTitle);
  }

  @Mutation
  setAedDeviceId(aedDeviceId: string) {
    this.fAedDeviceId = aedDeviceId;
    console.log(this.fAedDeviceId);
  }

  @Action({ commit: "setCreateVisible" })
  async vForm() {
    return !(
      this.fTitle == -1 ||
      this.fBody.e != "" ||
      this.fAedDeviceId == ""
    );
  }

  @Action
  async createAedProblems(data: AedProblemsCreateDto) {
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

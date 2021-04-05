import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { accessToken } from "@/plugins/api";
import { newsApi } from "@/plugins/api/api-urls";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import store from "@/store";
import { FieldObject } from "@/types";
import { NewsCard } from "@/types/news";
import i18n from "@/plugins/i18n";
import { newsRSocketApi } from "@/plugins/api/rsocket-api";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "newsCreate"
})
export default class NewsCreate extends VuexModule {
  fNewsTitle: FieldObject = {
    f: i18n.t("news.formTitle"),
    v: "",
    e: "",
    run: false
  };
  fContent: FieldObject = {
    f: i18n.t("news.formContent"),
    v: "",
    e: "",
    run: false
  };
  fTag = [-1];

  createVisible = false;
  successSubmit = false;

  @Mutation
  setSuccessSubmit(bool: boolean) {
    this.successSubmit = bool;
    this.createVisible = !bool;
  }
  @Mutation
  setCreateVisible(bool: boolean) {
    this.createVisible = bool;
    this.successSubmit = this.fNewsTitle.run && this.fContent.run && !bool;
  }

  @Mutation
  setTags(tag: number[]) {
    this.fTag = tag;
  }

  @Mutation
  clearValues() {
    this.fNewsTitle.v = "";
    this.fContent.v = "";
  }

  @Action({ commit: "setCreateVisible" })
  async vForm() {
    return !(
      this.fNewsTitle.v == "" ||
      this.fNewsTitle.e != "" ||
      this.fContent.e != "" ||
      this.fTag.length == 0 ||
      this.fTag[0] == -1
    );
  }

  @Action
  async createNews(data: NewsCard) {
    return new Promise(resolve => {
      newsRSocketApi().then(newsRSocket =>
        newsRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, newsApi.createNews)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.error(error)
          })
      );
    });
  }
}

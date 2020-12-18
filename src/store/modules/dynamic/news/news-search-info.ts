import { accessToken, newsRSocketApi } from "@/plugins/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { newsApi } from "@/plugins/api/api-urls";
import { NewsDto, NewsInfo } from "@/types/news";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import store from "@/store";
@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "newsSearchInfo"
})
export default class NewsSearchInfo extends VuexModule implements NewsInfo {
  id = "";
  username = "";
  newsTitle = "";
  content = "";
  uploadedTime = [0];

  @Mutation
  setNewsInfo(data: NewsInfo) {
    this.id = data.id;
    this.username = data.username;
    this.newsTitle = data.newsTitle;
    this.content = data.content;
    this.uploadedTime = data.uploadedTime;
  }

  @Action({ commit: "setNewsInfo" })
  async findNewsId(data: NewsDto) {
    return new Promise(resolve => {
      newsRSocketApi().then(newsRSocket =>
        newsRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, newsApi.findNewsId)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.error(error)
          })
      );
    });
  }
}
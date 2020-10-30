import { accessToken, newsRSocket } from "./../../plugins/api/index";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { newsApi } from "@/plugins/api/apiUrls";
import { NewsInfo, NewsMore } from "@/types";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocketUtil";
@Module({ namespaced: true })
export default class News extends VuexModule implements NewsMore {
  id = "";
  username = "";
  newsTitle = "";
  content = "";

  @Mutation
  setNewsInfo(data: NewsMore) {
    this.id = data.id;
    this.username = data.username;
    this.newsTitle = data.newsTitle;
    this.content = data.content;
  }

  @Action
  async createNews(data: NewsInfo) {
    return new Promise((resolve) => {
      newsRSocket
        .requestResponse({
          data: dataBuf(data),
          metadata: metadataBuf(accessToken, newsApi.createNews),
        })
        .subscribe({
          onComplete: (value) => {
            resolve(bufToJson(value));
          },
          onError: (error) => {
            console.log(error);
          },
        });
    });
  }

  @Action({ commit: "setNewsInfo" })
  async findNews(id: string) {
    return new Promise((resolve) => {
      newsRSocket
        .requestResponse({
          data: dataBuf({ id: id }),
          metadata: metadataBuf(accessToken, newsApi.findNews),
        })
        .subscribe({
          onComplete: (payload) => {
            console.log(bufToJson(payload));
            resolve(JSON.parse(bufToJson(payload)));
            //console.log("got response with requestResponse");
          },
          onError: (error) => {
            //console.log("got error with requestStream");
            console.error(error);
          },
        });
    });
  }
}

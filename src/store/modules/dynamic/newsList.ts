import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { NewsInfo } from "@/types";
import { accessToken, newsRSocketApi } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocketUtil";
import { newsApi } from "@/plugins/api/apiUrls";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "newsList"
})
export default class NewsList extends VuexModule {
  previewNews: NewsInfo[] | null = null;
  newsTitle = "";

  @Mutation
  setPreviewNews(eventInfo: NewsInfo[]) {
    this.previewNews = eventInfo;
  }

  @Action ({ commit: "setPreviewNews" })
  async fetchNewsPreview(newsTitle: string) {
    return new Promise(resolve => {
      const previewNews: NewsInfo[] = [];
      newsRSocketApi().then(newsRSocket => {
        newsRSocket
          .requestStream({
            data: dataBuf({ newsTitle: newsTitle }),
            metadata: metadataBuf(accessToken, newsApi.findNews)
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => previewNews.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(20)
          });
        resolve(previewNews);
      });
    });
  }
}

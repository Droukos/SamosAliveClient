import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { News, NewsInfo } from "@/types/news";
import { accessToken, newsRSocketApi } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { newsApi } from "@/plugins/api/api-urls";
import NewsSearch = News.NewsSearch;

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "newsList"
})
export default class NewsList extends VuexModule {
  previewNews: NewsInfo[] | null = null;
  newsTitle = "";
  searchTag = -1;
  options: NewsSearch = { newsTitle: "", searchTag: -1 };

  @Mutation
  setPreviewNews(eventInfo: NewsInfo[]) {
    this.previewNews = eventInfo;
  }
  @Mutation
  selectTitle(title: string) {
    this.newsTitle = title;
  }

  @Mutation
  selectTag(tag: number) {
    this.searchTag = tag;
  }

  @Mutation
  selectOptions() {
    this.options.newsTitle = this.newsTitle;
    this.options.searchTag = this.searchTag;
  }

  @Action({ commit: "setPreviewNews" })
  async fetchNewsPreview() {
    this.selectOptions();
    console.log(this.options);
    return new Promise(resolve => {
      const previewNews: NewsInfo[] = [];
      newsRSocketApi().then(newsRSocket => {
        newsRSocket
          .requestStream({
            data: dataBuf(this.options),
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

  //@Action({ commit: "setPreviewNews" })
  //async searchTag(tag: number) {
  //  return new Promise(resolve => {
  //    const previewNews: NewsInfo[] = [];
  //    newsRSocketApi().then(newsRSocket => {
  //      newsRSocket
  //        .requestStream({
  //          data: dataBuf({ tag: tag }),
  //          metadata: metadataBuf(accessToken, newsApi.findNews)
  //        })
  //        .subscribe({
  //          onError: error => console.error(error),
  //          onNext: payload => previewNews.push(bufToJson(payload)),
  //          onSubscribe: sub => sub.request(20)
  //        });
  //      resolve(previewNews);
  //    });
  //  });
  //}
}

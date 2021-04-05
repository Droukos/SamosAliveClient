import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { News, NewsInfo, NewsSearchMut } from "@/types/news";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { newsApi } from "@/plugins/api/api-urls";
import { tagOptions } from "@/plugins/enums/tags-options";
import NewsSearch = News.NewsSearchOptions;
import NewsSearchOptions = News.NewsSearchOptions;
import { getAccessTokenJwt, newsRSocketApi } from "@/plugins/api/rsocket-api";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "newsList"
})
export default class NewsList extends VuexModule {
  previewNews: NewsInfo[] | null = null;
  newsTitle = "";
  searchTag = [-1];
  allTags: NewsSearch = { newsTitle: "", searchTag: [-1] };
  selectTags: NewsSearch = { newsTitle: "", searchTag: [-1] };

  @Mutation
  setPreviewNews(eventInfo: NewsInfo[]) {
    console.log(eventInfo);
    this.previewNews = eventInfo;
  }
  //@Mutation
  //selectTitle(title: string) {
  //  this.newsTitle = title;
  //}
  //
  //@Mutation
  //selectTag(tag: number[]) {
  //  this.searchTag = tag;
  //}

  @Mutation
  selectOptions(data: NewsSearchMut) {
    if (data.searchCode === tagOptions.ALL) {
      this.allTags = data.options;
    } else if (data.searchCode === tagOptions.SELECT) {
      this.selectTags = data.options;
    }
  }

  @Action({ commit: "setPreviewNews" })
  async fetchNewsPreview(data: NewsSearchOptions) {
    return getAccessTokenJwt().then(token => {
      return new Promise(resolve => {
        const previewNews: NewsInfo[] = [];
        newsRSocketApi().then(newsRSocket => {
          newsRSocket
            .requestStream({
              data: dataBuf(data),
              metadata: metadataBuf(token, newsApi.findNews)
            })
            .subscribe({
              onError: error => console.error(error),
              onNext: payload => previewNews.push(bufToJson(payload)),
              onSubscribe: sub => sub.request(20),
              onComplete: () => resolve(previewNews)
            });
        });
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

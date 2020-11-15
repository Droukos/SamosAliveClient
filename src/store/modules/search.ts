import {
  accessToken,
  userRSocketApi,
  newsRSocketApi
} from "@/plugins/api";
import { Action, Module, VuexModule } from "vuex-module-decorators";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocketUtil";
import {
    RequestedPreviewUser,
    NewsInfo
} from "@/types";
import {
  newsApi,
  userApi
} from "@/plugins/api/apiUrls.ts";

@Module({ namespaced: true })
export default class Search extends VuexModule {
  @Action
  async fetchUsersPreview(user: string) {
    return new Promise(resolve => {
      const prUsers: RequestedPreviewUser[] = [];
      userRSocketApi().then(userRSocket => {
        userRSocket
            .requestStream({
              data: dataBuf({username: user}),
              metadata: metadataBuf(accessToken, userApi.searchPreview)
            })
            .subscribe({
              onError: error => console.error(error),
              onNext: payload => prUsers.push(bufToJson(payload)),
              onSubscribe: sub => sub.request(20)
            });
        resolve(prUsers);
      });
    });
  }

  @Action
  async fetchNewsPreview(newsTitle: string) {
    return new Promise(resolve => {
      const previewNews: NewsInfo[] = [];
      newsRSocketApi().then(newsRSocket => {
        newsRSocket
            .requestStream({
              data: dataBuf({newsTitle: newsTitle}),
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
  //Action
  //sync fetchEventsPreview(occurrenceType: number) {
  // const previewAedEvent: AedEventInfo[] = [];
  // aedRSocket
  //   .requestStream({
  //     data: dataBuf({ occurrenceType: occurrenceType }),
  //     metadata: metadataBuf(accessToken, eventApi.findOccurrenceType),
  //   })
  //   .subscribe({
  //     onComplete: () => {
  //       //console.log("got response with requestResponse");
  //     },
  //     onError: (error) => {
  //       //console.log("got error with requestStream");
  //       console.error(error);
  //     },
  //     onNext: (payload) => {
  //       previewAedEvent.push(JSON.parse(bufToJson(payload)));
  //       //this.context.commit("addPreviewUser", JSON.parse(bufToJson(payload)));
  //     },
  //     onSubscribe: (sub) => {
  //       sub.request(10);
  //     },
  //   });
  // return previewAedEvent;


 //@Action
 //async fetchNewsPreview(newsTitle: string) {
 //  const previewNews: NewsInfo[] = [];
 //  newsRSocket
 //    .requestStream({
 //      data: dataBuf({ newsTitle: newsTitle }),
 //      metadata: metadataBuf(accessToken, newsApi.findNews),
 //    })
 //    .subscribe({
 //      onComplete: () => {
 //        //console.log("got response with requestResponse");
 //      },
 //      onError: (error) => {
 //        //console.log("got error with requestStream");
 //        console.error(error);
 //      },
 //      onNext: (payload) => {
 //        console.log(bufToJson(payload));
 //        previewNews.push(JSON.parse(bufToJson(payload)));
 //        //this.context.commit("addPreviewUser", JSON.parse(bufToJson(payload)));
 //      },
 //      onSubscribe: (sub) => {
 //        sub.request(10);
 //      },
 //    });
 //  return previewNews;
 //}
//@Action
//async fetchProblemsPreview(title: string) {
//  const previewAedProblems: AedProblemsInfo[] = [];
//  aedRSocket
//    .requestStream({
//      data: dataBuf({ title: title }),
//      metadata: metadataBuf(accessToken, problemsApi.findProblems),
//    })
//    .subscribe({
//      onComplete: () => {
//        //console.log("got response with requestResponse");
//      },
//      onError: (error) => {
//        //console.log("got error with requestStream");
//        console.error(error);
//      },
//      onNext: (payload) => {
//        previewAedProblems.push(JSON.parse(bufToJson(payload)));
//        //this.context.commit("addPreviewUser", JSON.parse(bufToJson(payload)));
//      },
//      onSubscribe: (sub) => {
//        sub.request(10);
//      },
//    });
//  return previewAedProblems;
//}
//

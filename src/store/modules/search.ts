import {
  accessToken,
  userRSocketApi,
  aedRSocketApi,
  newsRSocketApi
} from "@/plugins/api";
import { Action, Module, VuexModule } from "vuex-module-decorators";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import {
  RequestedPreviewUser,
  AedEventInfo,
  NewsInfo,
  AedProblemsInfo
} from "@/types";
import {
    eventApi,
    newsApi,
    userApi,
    problemsApi, aedDeviceApi
} from "@/plugins/api/api-urls.ts";
import {IAedDevicePreview} from "@/types/aed-device";

@Module({ namespaced: true })
export default class Search extends VuexModule {
  @Action
  async fetchUsersPreview(user: string): Promise<RequestedPreviewUser[]> {
    return new Promise(resolve => {
      const prUsers: RequestedPreviewUser[] = [];
      userRSocketApi().then(userRSocket => {
        userRSocket
          .requestStream({
            data: dataBuf({ username: user }),
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
  async fetchAedDevicesPreview(aedDeviceNickname: string): Promise<IAedDevicePreview[]> {
    return new Promise(resolve => {
      const prAedDevices: IAedDevicePreview[] = [];
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
            .requestStream({
              data: dataBuf({ aedDeviceNickname: aedDeviceNickname }),
              metadata: metadataBuf(accessToken, aedDeviceApi.fetchAedDevicePreviews)
            })
            .subscribe({
              onError: error => console.error(error),
              onNext: payload => prAedDevices.push(bufToJson(payload)),
              onSubscribe: sub => sub.request(20)
            });
        resolve(prAedDevices);
      });
    });
  }

  @Action
  async fetchEventsPreview(occurrenceType: string) {
    return new Promise(resolve => {
      const previewAedEvent: AedEventInfo[] = [];
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestStream({
            data: dataBuf({ occurrenceType: occurrenceType }),
            metadata: metadataBuf(accessToken, eventApi.findOccurrenceType)
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => previewAedEvent.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(10)
          })
      );
      resolve(previewAedEvent);
    });
  }

  @Action
  async fetchNewsPreview(newsTitle: string) {
    return new Promise(resolve => {
      const previewNews: NewsInfo[] = [];
      newsRSocketApi().then(newRSocket =>
        newRSocket
          .requestStream({
            data: dataBuf({ newsTitle: newsTitle }),
            metadata: metadataBuf(accessToken, newsApi.findNews)
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => previewNews.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(10)
          })
      );
      resolve(previewNews);
    });
  }

  @Action
  async fetchProblemsPreview(title: string) {
    return new Promise(resolve => {
      const previewAedProblems: AedProblemsInfo[] = [];
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestStream({
            data: dataBuf({ title: title }),
            metadata: metadataBuf(accessToken, problemsApi.findProblems)
          })
          .subscribe({
            onNext: payload => previewAedProblems.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(10)
          })
      );
      resolve(previewAedProblems);
    });
  }
}

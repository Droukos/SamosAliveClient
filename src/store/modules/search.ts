import { accessToken, userRSocketApi } from "@/plugins/api";
import { Action, Module, VuexModule } from "vuex-module-decorators";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocketUtil";
import { RequestedPreviewUser } from "@/types";
import { userApi } from "@/plugins/api/apiUrls.ts";

@Module({ namespaced: true })
export default class Search extends VuexModule {
  @Action
  async fetchUsersPreview(user: string) {
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
}

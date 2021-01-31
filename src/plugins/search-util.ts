import { PreviewUser } from "@/types";
import { accessToken } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { userApi } from "@/plugins/api/api-urls";
import { userRSocketApi } from "@/plugins/api/rsocket-api";

export async function searchPreviewUsers(
  username: string
): Promise<PreviewUser[]> {
  return new Promise(resolve => {
    const prUsers: PreviewUser[] = [];
    userRSocketApi().then(userRSocket => {
      userRSocket
        .requestStream({
          data: dataBuf({ username: username }),
          metadata: metadataBuf(accessToken, userApi.searchPreview)
        })
        .subscribe({
          onError: error => console.error(error),
          onNext: payload => prUsers.push(bufToJson(payload)),
          onComplete: () => resolve(prUsers),
          onSubscribe: sub => sub.request(20)
        });
    });
  });
}

import { authRSocketApi, getAccessTokenJwt } from "@/plugins/api";
import { bufToData, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";

export async function adminRequestResponse(data: any, path: string) {
  return getAccessTokenJwt().then(token => {
    return new Promise(resolve => {
      authRSocketApi()
        .requestResponse({
          data: dataBuf(data),
          metadata: metadataBuf(token, path)
        })
        .subscribe({
          onError: error => console.error(error),
          onComplete: value => resolve(bufToData(value))
        });
    });
  });
}

import { EventDto } from "@/types/aed-event";
import { Commit } from "vuex";
import { accessToken, aedRSocketApi, getAccessTokenJwt } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";

export interface ContextMut {
  rSocketUrl: string;
  mapMut: string;
  subMut: string;
}

export async function rSocketChannelStream(data: {
  eventDto: EventDto;
  iSub: { name: string; sub: any };
  commit: Commit;
  mut: ContextMut;
}) {
  const requestedMsg = 10;
  let processedMsg = 0;
  const eventId = data.eventDto.id;

  aedRSocketApi().then(aedRSocket =>
    aedRSocket
      .requestStream({
        data: dataBuf(data.eventDto),
        metadata: metadataBuf(accessToken, data.mut.rSocketUrl)
      })
      .subscribe({
        onError: error => console.error(error),
        onNext: payload => {
          processedMsg++;
          if (processedMsg >= requestedMsg) {
            data.iSub.sub[data.iSub.name].request(requestedMsg);
            processedMsg = 0;
          }
          data.commit(data.mut.mapMut, {
            eventId: eventId,
            value: bufToJson(payload)
          });
        },
        onSubscribe: sub => {
          data.commit(data.mut.subMut, {
            id: eventId,
            sub: sub
          });
          sub.request(requestedMsg);
        }
      })
  );
}

export async function rSocketResponse(data: any, rSocketUrl: string) {
  return getAccessTokenJwt().then(token => {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(token, rSocketUrl)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.error(error)
          })
      );
    });
  });
}

export async function rSocketResponse2(data: any, rSocketUrl: string) {
  return getAccessTokenJwt().then(token => {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
          aedRSocket
              .requestResponse({
                data: dataBuf(data),
                metadata: metadataBuf(token, rSocketUrl)
              })
              .subscribe({
                onComplete: value => resolve(bufToJson(value)),
                onError: error => console.error(error)
              })
      );
    });
  });
}

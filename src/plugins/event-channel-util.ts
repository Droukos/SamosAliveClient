import {AedEvent, AedEventInfoDto, ChannelSubs, ChSubControl, EventDto} from "@/types/aed-event";
import { Commit } from "vuex";
import { accessToken, aedRSocketApi, getAccessTokenJwt } from "@/plugins/api";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import {PreviewRescuer, PreviewUserCh} from "@/types";
import {IAedDevPreview} from "@/types/aed-device";
import AedComment = AedEvent.AedComment;

export const evMap: Map<string, AedEventInfoDto> = new Map<string, AedEventInfoDto>();
export const rescuerEvMap: Map<string, PreviewRescuer> = new Map<
    string,
    PreviewRescuer
    >();
export const devEvMap: Map<string, IAedDevPreview> = new Map<string, IAedDevPreview>();
export const chSubsCtrl: Map<string, ChSubControl> = new Map<string, ChSubControl>();
export const chSubs: Map<string, ChannelSubs> = new Map<string, ChannelSubs>();
export const allUsers: Map<string, PreviewUserCh> = new Map<string, PreviewUserCh>();
export const chUsers: Map<string, Set<string>> = new Map<string, Set<string>>();
export const chDisc: Map<string, Map<number, AedComment[]>> = new Map<
    string,
    Map<number, AedComment[]>
    >();
export const tempDevEvMap: Map<string, IAedDevPreview[]> = new Map<
    string,
    IAedDevPreview[]
    >();

export function findElemOnChMap(
    aedEventId: string,
    map: Map<string, any>,
    tracker: number
) {
    const elem = map.get(aedEventId);
    if (tracker == 0 || aedEventId == "") return undefined;
    else return elem;
}

export function setChCtrl(
    evId: string,
    data: { prop: keyof ChSubControl; val: boolean }
) {
    if (!chSubsCtrl.has(evId)) {
        chSubsCtrl.set(evId, {});
    }
    chSubsCtrl.get(evId)![data.prop] = data.val;
}
export function checkChCtrl(evId: string, prop: keyof ChSubControl) {
    return (
        !chSubsCtrl.has(evId) ||
        (chSubsCtrl.has(evId) && !chSubsCtrl.get(evId)![prop])
    );
}

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

export async function setEventListeners(chCard: any, evDto: EventDto) {
    chCard.listenEvent(evDto);
    chCard.listenDeviceSub(evDto);
    chCard.listenRescuerSub(evDto);
    chCard.fetchEventUsers(evDto);
    chCard.listenUsersSub(evDto);
    chCard.listenDiscussionSub(evDto);
}

export async function fetchRescuerAndDevice(chCard: any) {
    if (
        chCard.aedEventDto.aedDeviceId != undefined &&
        chCard.aedDeviceSelected == null
    ) {
        chCard.fetchDeviceAndRescuer({
            aedDeviceId: chCard.aedEventDto.aedDeviceId
        });
    }
}

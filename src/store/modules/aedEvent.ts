import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocketUtil";
import { accessToken, aedRSocketApi } from "@/plugins/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { eventApi } from "@/plugins/api/apiUrls";
import { AedEventMore, AedEventInfo, EventDto} from "@/types";
@Module({ namespaced: true })
export default class AedEvent extends VuexModule implements AedEventMore {
  id = "";
  userid = "";
  username = "";
  occurrenceType = 0;
  address = "";
  comment = "";
  status = 0;
  requestedTime = "";

  @Mutation
  setAedEventInfo(data: AedEventMore) {
    this.id = data.id;
    this.userid = data.userid;
    this.username = data.username;
    this.occurrenceType = data.occurrenceType;
    this.address = data.address;
    this.comment = data.comment;
    this.status = data.status;
    this.requestedTime = data.requestedTime;
  }

  @Action
  async createAedEvent(data: AedEventInfo) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, eventApi.createEvent)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.error(error)
          })
      );
    });
  }

  @Action({ commit: "setAedEventInfo" })
  async findEventId(data: EventDto) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, eventApi.findEventId)
          })
          .subscribe({
            onComplete: value => resolve(bufToJson(value)),
            onError: error => console.error(error)
          })
      );
    });
  }
}
//TODO me requestResponce prosthiki diasosti
//@Action
//async createAedEvent(data: AedEventInfo) {
//  return new Promise((resolve) => {
//    aedRSocket
//      .requestResponse({
//        data: dataBuf(data),
//        metadata: metadataBuf(accessToken, eventApi.createEvent),
//      })
//      .subscribe({
//        onComplete: (value) => {
//          resolve(bufToJson(value));
//        },
//        onError: (error) => {
//          console.log(error);
//        },
//      });
//  });
//}

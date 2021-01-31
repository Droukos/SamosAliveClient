import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { AedDeviceInfoI } from "@/types/aed-device";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { aedDeviceApi } from "@/plugins/api/api-urls";
import { latLng } from "leaflet";
import { aedRSocketApi, getAccessTokenJwt } from "@/plugins/api/rsocket-api";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "aedDeviceInfo"
})
export default class AedDeviceInfo extends VuexModule
  implements AedDeviceInfoI {
  id = "";
  uniqueNickname = "";
  modelName = "";
  description = "";

  added = [0];
  addedBy = "";
  status = 0;
  statusDescription = "";

  homePoint = {
    x: 0,
    y: 0
  };
  picUrl = "";
  addressPicUrl = "";
  address = "";

  onPoint = {
    x: 0,
    y: 0
  };
  onEventId = "";
  onUserId = "";
  takenOn = [0];
  onEstimatedFinish = 0;

  zoom = 15.5;
  center = latLng(this.homePoint.y, this.homePoint.x);
  marker = latLng(this.homePoint.y, this.homePoint.x);

  @Mutation
  setAedDeviceInfo(data: AedDeviceInfo) {
    this.id = data.id;
    this.uniqueNickname = data.uniqueNickname;
    this.modelName = data.modelName;
    this.description = data.description;
    this.added = data.added;
    this.addedBy = data.addedBy;
    this.status = data.status;
    this.statusDescription = data.statusDescription;
    this.homePoint = data.homePoint;
    this.picUrl = data.picUrl;
    this.addressPicUrl = data.addressPicUrl;
    this.address = data.address;
    this.onPoint = data.onPoint;
    this.onEventId = data.onEventId;
    this.onUserId = data.onUserId;
    this.takenOn = data.takenOn;
    this.onEstimatedFinish = data.onEstimatedFinish;
    this.center = latLng(this.homePoint.y, this.homePoint.x);
    this.marker = latLng(this.homePoint.y, this.homePoint.x);
  }

  @Action({ commit: "setAedDeviceInfo" })
  async fetchAedDeviceInfo(aedDeviceId: string) {
    return getAccessTokenJwt().then(token => {
      return new Promise(resolve => {
        aedRSocketApi().then(aedRSocket => {
          aedRSocket
            .requestResponse({
              data: dataBuf({ id: aedDeviceId }),
              metadata: metadataBuf(token, aedDeviceApi.fetchAedDevice)
            })
            .subscribe({
              onComplete: value => resolve(bufToJson(value)),
              onError: error => console.log(error)
            });
        });
      });
    });
  }
}

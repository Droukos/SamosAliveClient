import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import {
  AddressObject,
  FieldObject,
  FieldObject2,
  FileImg,
  OpenStreetObjData
} from "@/types";
import { latLng } from "leaflet";
import i18n from "@/plugins/i18n";
import { IAedDeviceEdit, IAedDeviceInfo } from "@/types/aed-device";
import api, { accessToken, aedRSocketApi } from "@/plugins/api";
import { aedDeviceApi, apiWithVar, cdnApi } from "@/plugins/api/api-urls";
import { bufToData, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { searchOsmAddress } from "@/plugins/osm-util";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "aedDeviceEdit"
})
export default class AedDeviceEdit extends VuexModule {
  id = "";
  fModelName: FieldObject = {
    f: i18n.t("device-register.modelName"),
    v: "",
    e: "",
    run: false
  };
  fModelDescription: FieldObject = {
    f: i18n.t("device-register.modelDesc"),
    v: "",
    e: "",
    run: false
  };
  fAddress: AddressObject = {
    f: i18n.t("device-register.addr"),
    v: {
      label: "",
      x: 23.7613248,
      y: 37.977308
    },
    e: "",
    run: false,
    loading: false,
    hint: []
  };
  fAddressOnMap: FieldObject2 = {
    f: i18n.t("device-register.addrOnMap"),
    v: "",
    e: "",
    run: false
  };
  fAddressPicture: FieldObject2 = {
    f: i18n.t("device-register.addrPic"),
    v: "",
    e: "",
    run: false
  };
  fDevicePicture: FieldObject2 = {
    f: i18n.t("device-register.devPic"),
    v: "",
    e: "",
    run: false
  };
  zoom = 15.5;
  center = latLng(this.fAddress.v!.y, this.fAddress.v!.x);
  marker = latLng(this.fAddress.v!.y, this.fAddress.v!.x);
  showUploadedDevicePic = false;
  showErrorDevicePic = false;
  showUploadedDeviceAddrPic = false;
  showErrorDeviceAddrPic = false;
  showUpdatedAedDevice = false;
  showErrorUpdatedAedDevice = false;
  showUpload = false;
  addrFileImg: FileImg = {
    selectedFile: new File([], ""),
    validFileExtensions: [".jpg", ".jpeg", ".bmp", ".gif", ".png"],
    notUsedImgUpload: true
  };
  deviceFileImg: FileImg = {
    selectedFile: new File([], ""),
    validFileExtensions: [".jpg", ".jpeg", ".bmp", ".gif", ".png"],
    notUsedImgUpload: true
  };

  @Mutation
  setAddressHints(hints: any[]) {
    this.fAddress.hint = hints;
  }

  @Mutation
  addressValueChange(value: OpenStreetObjData) {
    this.fAddress.v = value;
    this.center = latLng(value.y, value.x);
    this.marker = latLng(value.y, value.x);
  }

  @Mutation
  setEditAedDeviceInfo(aedDeviceInfo: IAedDeviceInfo) {
    this.id = aedDeviceInfo.id;
    this.fModelName.v = aedDeviceInfo.modelName;
    this.fModelDescription.v = aedDeviceInfo.description;
    this.fAddress.v.label = aedDeviceInfo.address;
    this.fAddress.v.x = aedDeviceInfo.homePoint.x;
    this.fAddress.v.y = aedDeviceInfo.homePoint.y;
    this.center = latLng(this.fAddress.v.y, this.fAddress.v.x);
    this.marker = latLng(this.fAddress.v.y, this.fAddress.v.x);
  }

  @Mutation
  setDeviceUploadHint(data: Response) {
    if (data.status == 200) {
      this.showUploadedDevicePic = true;
      this.showErrorDevicePic = false;
    } else {
      this.showUploadedDevicePic = false;
      this.showErrorDevicePic = true;
    }
  }

  @Mutation
  setDeviceAddressUploadHint(data: Response) {
    if (data.status == 200) {
      this.showUploadedDeviceAddrPic = true;
      this.showErrorDeviceAddrPic = false;
    } else {
      this.showUploadedDeviceAddrPic = false;
      this.showErrorDeviceAddrPic = true;
    }
  }

  @Mutation
  setUpdateVisible(upVisible: boolean) {
    this.showUpload = upVisible;
  }

  @Mutation
  setUpdateMessage(data: string) {
    if (data == "true") {
      this.showUpdatedAedDevice = true;
      this.showErrorUpdatedAedDevice = false;
      this.showUpload = false;
    } else {
      this.showUpdatedAedDevice = false;
      this.showErrorUpdatedAedDevice = true;
      this.showUpload = false;
    }
  }

  @Action({ commit: "setUpdateVisible" })
  vForm() {
    return !(
      this.fModelName.e != "" ||
      this.fModelDescription.e != "" ||
      this.fAddress.e != ""
    );
  }

  get editAedDeviceDto(): IAedDeviceEdit {
    return {
      id: this.id,
      modelName: this.fModelName.v,
      modelDescription: this.fModelDescription.v,
      address: this.fAddress.v.label,
      homePointX: this.fAddress.v.x,
      homePointY: this.fAddress.v.y
    };
  }

  @Action({ commit: "setUpdateMessage" })
  updateAedDevice() {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
          .requestResponse({
            data: dataBuf(this.editAedDeviceDto),
            metadata: metadataBuf(accessToken, aedDeviceApi.editAedDeviceInfo)
          })
          .subscribe({
            onComplete: value => resolve(bufToData(value)),
            onError: error => console.log(error)
          });
      });
    });
  }

  @Action({ commit: "setAddressHints" })
  async callOpenStreetApi(queryAddress: string) {
    if (this.fAddress.v != null) {
      this.fAddress.loading = true;
      return searchOsmAddress({ address: queryAddress });
    }
  }

  @Action({ commit: "setDeviceUploadHint" })
  async uploadDevicePic(aedDId: string) {
    const data = new FormData();
    data.append("deviceFile", this.fDevicePicture.v);
    if (aedDId != "") {
      return await api.put(apiWithVar(cdnApi.aedDevicePic, aedDId), data, {
        baseURL: document
          .querySelector('meta[name="cdn_server"]')!
          .getAttribute("content")!,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }
  }

  @Action({ commit: "setDeviceAddressUploadHint" })
  async uploadDeviceAddressPic(aedDId: string) {
    const data = new FormData();
    data.append("addrFile", this.fAddressPicture.v);
    if (aedDId != "") {
      return await api.put(
        apiWithVar(cdnApi.aedDeviceAddressPic, aedDId),
        data,
        {
          baseURL: document
            .querySelector('meta[name="cdn_server"]')!
            .getAttribute("content")!,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
    }
  }
}

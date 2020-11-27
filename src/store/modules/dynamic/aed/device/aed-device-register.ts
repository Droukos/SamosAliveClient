import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
  AddressObject,
  FieldObject,
  FieldObject2,
  FileImg,
  OpenStreetObjData
} from "@/types";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import store from "@/store";
import i18n from "@/plugins/i18n";
import { TranslateResult } from "vue-i18n";
import L from "leaflet";
import api, { accessToken, aedRSocketApi } from "@/plugins/api";
import { bufToData, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import {
  aedDeviceApi,
  apiWithVar,
  cdnApi
} from "@/plugins/api/api-urls";
import { IAedDeviceRegister } from "@/types/aed-device";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "aedDeviceRegister"
})
export default class AedDeviceRegister extends VuexModule {
  fNickname: FieldObject = {
    f: i18n.t("device-register.nickname"),
    v: "",
    e: "",
    run: false
  };
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
      bounds: [],
      label: "",
      raw: {},
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
  provider = new OpenStreetMapProvider();
  zoom = 15.5;
  center = L.latLng(this.fAddress.v!.y, this.fAddress.v!.x);
  marker = L.latLng(this.fAddress.v!.y, this.fAddress.v!.x);

  updateResultMessage: TranslateResult = "";
  createVisible = false;
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
  setCreateVisible(createVisible: boolean) {
    this.createVisible = createVisible;
  }

  @Mutation
  addressValueChange(value: OpenStreetObjData) {
    this.fAddress.v = value;
    this.center = L.latLng(value.y, value.x);
    this.marker = L.latLng(value.y, value.x);
  }

  @Mutation
  setAddressHints(hints: any[]) {
    this.fAddress.hint = hints;
  }

  @Action({ commit: "setCreateVisible" })
  async vForm() {
    return !(
      this.fNickname.v == "" ||
      this.fNickname.e != "" ||
      this.fModelName.v == "" ||
      this.fModelName.e != "" ||
      this.fModelDescription.v == "" ||
      this.fModelDescription.e != "" ||
      this.fAddress.v?.label == "" ||
      this.fAddress.e != "" ||
      this.fDevicePicture.v == "" ||
      this.fDevicePicture.e != "" ||
      this.fAddressPicture.v == "" ||
      this.fAddressPicture.e != ""
    );
  }

  @Mutation
  setAddressPicError(error: string) {
    this.fAddressPicture.e = error;
  }

  @Mutation
  setDevicePicError(error: string) {
    this.fDevicePicture.e = error;
  }

  @Action({ commit: "setAddressHints" })
  async callOpenStreetApi(queryAddress: string) {
    if (this.fAddress.v != null) {
      this.fAddress.loading = true;
      return await this.provider.search({ query: queryAddress }).then(value => {
        this.fAddress.loading = false;
        return value;
      });
    }
  }

  get aedDeviceRegisterObj(): IAedDeviceRegister {
    return {
      uniqueNickname: this.fNickname.v,
      modelName: this.fModelName.v,
      description: this.fModelDescription.v,
      defaultMapX: this.fAddress.v!.x,
      defaultMapY: this.fAddress.v!.y,
      address: this.fAddress.v!.label
    };
  }

  @Action
  async registerAedDevice(): Promise<string> {

    return new Promise((resolve, reject) => {
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
          .requestResponse({
            data: dataBuf(this.context.getters["aedDeviceRegisterObj"]),
            metadata: metadataBuf(accessToken, aedDeviceApi.registerAedDevice)
          })
          .subscribe({
            onComplete: value => {
              const f = bufToData(value);
              const data = new FormData();
              data.append("addrFile", this.fAddressPicture.v);
              data.append("deviceFile", this.fDevicePicture.v)
              if (f != "") {
                api.put(apiWithVar(cdnApi.aedDeviceRegister, f), data, {
                  baseURL: document
                      .querySelector('meta[name="cdn_server"]')!
                      .getAttribute("content")!,
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then(() => resolve(f))
              }
            },
            onError: error => reject(error)

          });
      });
    });
  }
}
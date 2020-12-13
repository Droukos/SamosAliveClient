import {
  AddressObject,
  FieldObject,
  OpenStreetObjData
} from "@/types";
import { AedEventCreateDto } from "@/types/aed-event";
import i18n from "@/plugins/i18n";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import store from "@/store";
import { accessToken, aedRSocketApi } from "@/plugins/api";
import {bufToData, dataBuf, metadataBuf} from "@/plugins/api/rsocket-util";
import { eventApi } from "@/plugins/api/api-urls";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "aedEventCreate"
})
export default class AedEventCreate extends VuexModule {
  fComment: FieldObject = {
    f: i18n.t("events.comm"),
    v: "",
    e: "",
    run: false
  };
  fAddress: AddressObject = {
    f: i18n.t("events.addr"),
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
  provider = new OpenStreetMapProvider();
  zoom = 15.5;
  center = L.latLng(this.fAddress.v!.y, this.fAddress.v!.x);
  marker = L.latLng(this.fAddress.v!.y, this.fAddress.v!.x);
  createVisible = false;
  dialog = false;

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

  @Mutation
  setCreateVisible(createVisible: boolean) {
    this.createVisible = createVisible;
  }

  @Mutation
  setDialog(dialog: boolean) {
    this.dialog = dialog;
  }

  @Action({ commit: "setCreateVisible" })
  async vForm() {
    return !(
      this.fAddress.v?.label == "" ||
      this.fAddress.e != "" ||
      //this.fComment.v == "" ||
      this.fComment.e != ""
    );
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

  @Action
  async createAedEvent(data: AedEventCreateDto) {
    return new Promise(resolve => {
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestResponse({
            data: dataBuf(data),
            metadata: metadataBuf(accessToken, eventApi.createEvent)
          })
          .subscribe({
            onComplete: value => resolve(bufToData(value)),
            onError: error => console.error(error)
          })
      );
    });
  }
}

import { AddressObject, FieldObject, OpenStreetObjData } from "@/types";
import { AedEventCreateDto } from "@/types/aed-event";
import i18n from "@/plugins/i18n";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { latLng } from "leaflet";
import store from "@/store";
import { accessToken } from "@/plugins/api";
import { bufToData, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { eventApi } from "@/plugins/api/api-urls";
import {
  getAddressLabel,
  reverseOsmGeocoding,
  searchOsmAddress
} from "@/plugins/osm-util";
import { ReverseOsmData } from "@/types/osm";
import { aedRSocketApi } from "@/plugins/api/rsocket-api";

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  name: "aedEventCreate"
})
export default class AedEventCreate extends VuexModule {
  fCallee: FieldObject = {
    f: i18n.t("events.callee"),
    v: "",
    e: "",
    run: false
  };
  fPhone: FieldObject = {
    f: i18n.t("events.phone"),
    v: "",
    e: "",
    run: false
  };
  fComment: FieldObject = {
    f: i18n.t("events.comInfo"),
    v: "",
    e: "",
    run: false
  };
  fAddress: AddressObject = {
    f: i18n.t("events.address"),
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
  zoom = 15.5;
  center = latLng(this.fAddress.v.y, this.fAddress.v.x);
  marker = latLng(this.fAddress.v.y, this.fAddress.v.x);
  createVisible = false;

  @Mutation
  addressValueChange(value: OpenStreetObjData) {
    this.fAddress.v = value;
    this.center = latLng(value.y, value.x);
    this.marker = latLng(value.y, value.x);
  }

  @Mutation
  setSearchableMarkerLatLong(data: ReverseOsmData) {
    const x = Number(data.lat);
    const y = Number(data.lon);
    this.marker = latLng(x, y);
    this.center = latLng(x, y);
    this.fAddress.v = {
      label: getAddressLabel(data.address),
      x: x,
      y: y
    };
  }

  @Mutation
  setAddressHints(hints: any[]) {
    this.fAddress.loading = false;
    this.fAddress.hint = hints;
  }

  @Mutation
  setCreateVisible(createVisible: boolean) {
    this.createVisible = createVisible;
  }

  @Action({ commit: "setCreateVisible" })
  async vForm() {
    return !(
      this.fAddress.v?.label == "" ||
      this.fAddress.e != "" ||
      this.fComment.e != "" ||
      this.fPhone.v.length != 10 ||
      this.fCallee.v.length > 120
    );
  }

  @Action({ commit: "setSearchableMarkerLatLong" })
  async osmReverseGeoCoding(latLng: { y: number; x: number }) {
    return reverseOsmGeocoding({ lat: latLng.y, lon: latLng.x });
  }

  @Action({ commit: "setSearchableMarkerLatLong" })
  async osmReverseGeoCodingOnCurPos(position: Position) {
    return reverseOsmGeocoding({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  }

  @Action({ commit: "setAddressHints" })
  async callOpenStreetApi(queryAddress: string) {
    if (this.fAddress.v != null) {
      this.fAddress.loading = true;
      return searchOsmAddress({ address: queryAddress });
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

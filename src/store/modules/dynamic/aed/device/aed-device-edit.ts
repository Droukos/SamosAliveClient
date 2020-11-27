import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import {AddressObject, FieldObject, FieldObject2, FileImg} from "@/types";
import i18n from "@/plugins/i18n";
import {OpenStreetMapProvider} from "leaflet-geosearch";
import L from "leaflet";
import {IAedDeviceInfo} from "@/types/aed-device";

@Module({
    dynamic: true,
    namespaced: true,
    store: store,
    name: "aedDeviceEdit"
})
export default class AedDeviceEdit extends VuexModule {
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
    setEditAedDeviceInfo(aedDeviceInfo: IAedDeviceInfo) {
        this.fModelName.v = aedDeviceInfo.modelName;
        this.fModelDescription.v = aedDeviceInfo.description;
        this.fAddress.v!.label = aedDeviceInfo.address;
        this.fAddress.v!.x = aedDeviceInfo.homePoint.x;
        this.fAddress.v!.y = aedDeviceInfo.homePoint.y;
        this.center = L.latLng(this.fAddress.v!.y, this.fAddress.v!.x);
        this.marker = L.latLng(this.fAddress.v!.y, this.fAddress.v!.x);
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
}
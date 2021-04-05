import store from "@/store";
import { accessToken } from "@/plugins/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import { PreviewUser } from "@/types";
import { aedDeviceApi } from "@/plugins/api/api-urls.ts";
import { AedDeviceMapSearchDto, AedDevPreview } from "@/types/aed-device";
import searchOptions, {
  deviceSearchTypeRadios,
  radiusOptions
} from "@/plugins/enums/search-options";
import { latLng } from "leaflet";
import { searchPreviewUsers } from "@/plugins/search-util";
import { aedRSocketApi } from "@/plugins/api/rsocket-api";

@Module({ dynamic: true, namespaced: true, store: store, name: "search" })
export default class Search extends VuexModule {
  searchModel = "";
  searchLabel = "";
  searchCounter = 30;
  searchOption = searchOptions.USERS;
  searchDevice = deviceSearchTypeRadios.SEARCH_TEXT;
  expandSettings = false;
  expandFilters = false;
  validToSearch = true;
  previewUsers: PreviewUser[] = [];
  previewAedDevices: AedDevPreview[] = [];
  zoom = 12.8;
  center = latLng(37.977308, 23.7613248);
  marker = latLng(37.977308, 23.7613248);
  radius = 3000;
  radiusSlider = radiusOptions.KM2;
  events: any[] = [];

  @Mutation
  toggleSearchFilters() {
    this.expandFilters = !this.expandFilters;
    this.expandSettings = false;
  }

  @Mutation
  toggleSearchSettings() {
    this.expandSettings = !this.expandSettings;
    this.expandFilters = false;
  }

  @Mutation
  closeSearchFilters() {
    this.expandFilters = false;
  }

  @Mutation
  closeSearchSettings() {
    this.expandSettings = false;
  }

  @Mutation
  setSearchLabel(label: string) {
    this.searchLabel = label;
  }

  @Mutation
  setValidToSearch(bool: boolean) {
    this.validToSearch = bool;
  }

  @Mutation
  setSearchCounter(counter: number) {
    this.searchCounter = counter;
  }

  @Mutation
  setSearchOption(option: number) {
    this.searchOption = option;
  }

  @Mutation
  setSearchDevice(option: number) {
    this.searchDevice = option;
  }

  @Mutation
  setPreviewUsers(previewUsers: PreviewUser[]) {
    this.previewUsers = previewUsers;
  }

  @Mutation
  setPreviewAedDevices(previewAedDevices: AedDevPreview[]) {
    this.previewAedDevices = previewAedDevices;
  }

  @Mutation
  setSearchableMarkerLatLong(data: { y: number; x: number }) {
    this.marker = latLng(data.y, data.x);
    this.center = latLng(data.y, data.x);
  }

  @Mutation
  setRadiusSlider(radius: number) {
    this.radius = radius * 1000;
    this.radiusSlider = radius;
  }

  get mapSearchDto(): AedDeviceMapSearchDto {
    return {
      y: this.marker.lat,
      x: this.marker.lng,
      distance: this.radiusSlider
    };
  }

  get markerLat(): number {
    return this.marker.lat;
  }

  get markerLng(): number {
    return this.marker.lng;
  }

  @Action({ commit: "setPreviewAedDevices" })
  async fetchAedDeviceInAreaPreview(): Promise<AedDevPreview[]> {
    return new Promise(resolve => {
      const prDevices: AedDevPreview[] = [];
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
          .requestStream({
            data: dataBuf(this.mapSearchDto),
            metadata: metadataBuf(
              accessToken,
              aedDeviceApi.fetchAedDeviceInArea
            )
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => prDevices.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(20),
            onComplete: () => resolve(prDevices)
          });
        resolve(prDevices);
      });
    });
  }

  @Action({ commit: "setPreviewAedDevices" })
  async fetchAedDeviceInAreaAvailablePreview(): Promise<AedDevPreview[]> {
    return new Promise(resolve => {
      const prDevices: AedDevPreview[] = [];
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
            .requestStream({
              data: dataBuf(this.mapSearchDto),
              metadata: metadataBuf(
                  accessToken,
                  aedDeviceApi.fetchAedDeviceInAreaAvailable
              )
            })
            .subscribe({
              onError: error => console.error(error),
              onNext: payload => prDevices.push(bufToJson(payload)),
              onSubscribe: sub => sub.request(20),
              onComplete: () => resolve(prDevices)
            });
      });
    });
  }

  @Action
  async fetchUsersPreview(user: string): Promise<PreviewUser[]> {
    return searchPreviewUsers(user);
  }

  @Action
  async fetchAedDevicesPreview(
    aedDeviceNickname: string
  ): Promise<AedDevPreview[]> {
    return new Promise(resolve => {
      const prAedDevices: AedDevPreview[] = [];
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
          .requestStream({
            data: dataBuf({ aedDeviceNickname: aedDeviceNickname }),
            metadata: metadataBuf(
              accessToken,
              aedDeviceApi.fetchAedDevicePreviews
            )
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => prAedDevices.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(20)
          });
        resolve(prAedDevices);
      });
    });
  }
}

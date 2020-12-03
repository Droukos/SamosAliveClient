import {
  accessToken,
  userRSocketApi,
  aedRSocketApi,
  newsRSocketApi
} from "@/plugins/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { bufToJson, dataBuf, metadataBuf } from "@/plugins/api/rsocket-util";
import {
  RequestedPreviewUser,
  AedEventInfo,
  NewsInfo,
  AedProblemsInfo
} from "@/types";
import {
  eventApi,
  newsApi,
  userApi,
  problemsApi,
  aedDeviceApi
} from "@/plugins/api/api-urls.ts";
import {IAedDeviceMapSearchDto, IAedDevicePreview} from "@/types/aed-device";
import searchOptions, {
  deviceSearchTypeRadios, radiusOptions
} from "@/plugins/enums/search-options";
import L from "leaflet";

@Module({ namespaced: true })
export default class Search extends VuexModule {
  searchModel = "";
  searchLabel = "";
  searchCounter = 30;
  searchOption = searchOptions.USERS;
  searchDevice = deviceSearchTypeRadios.SEARCH_TEXT;
  expandSettings = false;
  expandFilters = false;
  validToSearch = true;
  previewUsers: RequestedPreviewUser[] = [];
  previewAedDevices: IAedDevicePreview[] = [];
  zoom = 12.8;
  center = L.latLng(37.977308, 23.7613248);
  marker = L.latLng(37.977308, 23.7613248);
  radius = 3000;
  radiusSlider = radiusOptions.KM2

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
  setPreviewUsers(previewUsers: RequestedPreviewUser[]) {
    this.previewUsers = previewUsers;
  }

  @Mutation
  setPreviewAedDevices(previewAedDevices: IAedDevicePreview[]) {
    this.previewAedDevices = previewAedDevices;
  }

  @Mutation
  setSearchableMarkerLatLong(latLng: {y: number, x: number}) {
    this.marker = L.latLng(latLng.y, latLng.x);
    this.center = L.latLng(latLng.y, latLng.x);
  }

  @Mutation
  setRadiusSlider(radius: number) {
    this.radius = radius * 1000;
    this.radiusSlider = radius;
  }

  get mapSearchDto(): IAedDeviceMapSearchDto {
    return {
      y: this.marker.lat,
      x: this.marker.lng,
      distance: this.radiusSlider
    }
  }

  get markerLat(): number {
    return this.marker.lat;
  }

  get markerLng(): number {
    return this.marker.lng;
  }

  @Action({commit: "setPreviewAedDevices"})
  async fetchAedDeviceInAreaPreview(): Promise<IAedDevicePreview[]> {
    return new Promise(resolve => {
      const prDevices: IAedDevicePreview[] = [];
      aedRSocketApi().then(aedRSocket => {
        aedRSocket
            .requestStream({
              data: dataBuf(this.mapSearchDto),
              metadata: metadataBuf(accessToken, aedDeviceApi.fetchAedDeviceInArea)
            })
            .subscribe({
              onError: error => console.error(error),
              onNext: payload => prDevices.push(bufToJson(payload)),
              onSubscribe: sub => sub.request(20)
            });
        resolve(prDevices);
      });
    });
  }

  @Action
  async fetchUsersPreview(user: string): Promise<RequestedPreviewUser[]> {
    return new Promise(resolve => {
      const prUsers: RequestedPreviewUser[] = [];
      userRSocketApi().then(userRSocket => {
        userRSocket
          .requestStream({
            data: dataBuf({ username: user }),
            metadata: metadataBuf(accessToken, userApi.searchPreview)
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => prUsers.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(20)
          });
        resolve(prUsers);
      });
    });
  }

  @Action
  async fetchAedDevicesPreview(
    aedDeviceNickname: string
  ): Promise<IAedDevicePreview[]> {
    return new Promise(resolve => {
      const prAedDevices: IAedDevicePreview[] = [];
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

  @Action
  async fetchEventsPreview(occurrenceType: string) {
    return new Promise(resolve => {
      const previewAedEvent: AedEventInfo[] = [];
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestStream({
            data: dataBuf({ occurrenceType: occurrenceType }),
            metadata: metadataBuf(accessToken, eventApi.findOccurrenceType)
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => previewAedEvent.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(10)
          })
      );
      resolve(previewAedEvent);
    });
  }

  @Action
  async fetchNewsPreview(newsTitle: string) {
    return new Promise(resolve => {
      const previewNews: NewsInfo[] = [];
      newsRSocketApi().then(newRSocket =>
        newRSocket
          .requestStream({
            data: dataBuf({ newsTitle: newsTitle }),
            metadata: metadataBuf(accessToken, newsApi.findNews)
          })
          .subscribe({
            onError: error => console.error(error),
            onNext: payload => previewNews.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(10)
          })
      );
      resolve(previewNews);
    });
  }

  @Action
  async fetchProblemsPreview(title: string) {
    return new Promise(resolve => {
      const previewAedProblems: AedProblemsInfo[] = [];
      aedRSocketApi().then(aedRSocket =>
        aedRSocket
          .requestStream({
            data: dataBuf({ title: title }),
            metadata: metadataBuf(accessToken, problemsApi.findProblems)
          })
          .subscribe({
            onNext: payload => previewAedProblems.push(bufToJson(payload)),
            onSubscribe: sub => sub.request(10)
          })
      );
      resolve(previewAedProblems);
    });
  }
}

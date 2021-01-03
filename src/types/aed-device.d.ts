import { User } from "@/types/index";
import AedDeviceId = AedDevice.AedDeviceId;
import {RouteInfo} from "@/types/osm";

declare namespace AedDevice {
  type AedDeviceId = string;
  type UniqueNickname = string;
  type ModelName = string;
  type ModelDescription = string;
  type Address = string;
  type AddressPointLat = number;
  type AddressPointLon = number;
  interface HomePoint {
    x: AedDevice.AddressPointLat;
    y: AedDevice.AddressPointLon;
  }
  type AddressPic = string;
  type DevicePic = string;
  type Added = number[];
  type AddedBy = string;
  type Status = number;
  type StatusDescription = string;
  interface OnPoint {
    x: AedDevice.AddressPointLat;
    y: AedDevice.AddressPointLon;
  }
  type OnEventId = string;
  type OnUserId = User.UserId;
  type TakenOn = number[];
  type EstimatedFinish = number;
}

export type AedDeviceUniqueNickname = AedDevice.UniqueNickname;
export type AedDeviceModelName = AedDevice.ModelName;
export type AedDeviceModelDescription = AedDevice.ModelDescription;
export type AedDeviceAddress = AedDevice.Address;
export type AedDeviceAddressPointLat = AedDevice.AddressPointLat;
export type AedDeviceAddressPointLon = AedDevice.AddressPointLon;
export type AedDeviceAddressPic = AedDevice.AddressPic;
export type AedDeviceDevicePic = AedDevice.DevicePic;

export interface IAedDeviceRegister {
  uniqueNickname: AedDeviceUniqueNickname;
  modelName: AedDeviceModelName;
  description: AedDeviceModelDescription;
  defaultMapLat: AedDeviceAddressPointLat;
  defaultMapLon: AedDeviceAddressPointLon;
  address: AedDeviceAddress;
}

export interface IAedDeviceEdit {
  id: AedDeviceId;
  modelName: AedDeviceModelName;
  modelDescription: AedDeviceModelDescription;
  address: AedDeviceAddress;
  homePointX: AedDeviceAddressPointLat;
  homePointY: AedDeviceAddressPointLon;
}

export interface IAedDeviceInfo {
  id: AedDevice.AedDeviceId;
  uniqueNickname: AedDeviceUniqueNickname;
  modelName: AedDeviceModelName;
  description: AedDeviceModelDescription;
  added: AedDevice.Added;
  addedBy: AedDevice.AddedBy;
  status: AedDevice.Status;
  statusDescription: AedDevice.StatusDescription;
  homePoint: AedDevice.HomePoint;
  picUrl: AedDevice.DevicePic;
  addressPicUrl: AedDevice.AddressPic;
  address: AedDeviceAddress;
  onPoint: AedDevice.OnPoint;
  onEventId: AedDevice.OnEventId;
  onUserId: AedDevice.OnUserId;
  takenOn: AedDevice.TakenOn;
  onEstimatedFinish: AedDevice.EstimatedFinish;
}

export interface IAedDevPreview {
  id: AedDevice.AedDeviceId;
  uniqueNickname: AedDeviceUniqueNickname;
  modelName: AedDeviceModelName;
  description: AedDeviceModelDescription;
  status: AedDevice.Status;
  picUrl: AedDevice.DevicePic;
  address: AedDeviceAddress;
  homePoint: AedDevice.HomePoint;
  onEventId: AedDevice.OnEventId;
  onUserId: AedDevice.OnUserId;
  takenOn: AedDevice.TakenOn;
  estimatedFinish: AedDevice.EstimatedFinish;
  responseRouteInfo?: RouteInfo | null
}

export interface IAedDeviceMapSearchDto {
  x: number;
  y: number;
  distance: number;
}

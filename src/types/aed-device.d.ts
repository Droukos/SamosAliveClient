import { User } from "@/types/index";

declare namespace AedDevice {
  type AedDeviceId = string;
  type UniqueNickname = string;
  type ModelName = string;
  type ModelDescription = string;
  type Address = string;
  type AddressPointX = number;
  type AddressPointY = number;
  interface HomePoint {
    x: AedDevice.AddressPointX;
    y: AedDevice.AddressPointY;
  }
  type AddressPic = string;
  type DevicePic = string;
  type Added = number[];
  type AddedBy = string;
  type Status = number;
  type StatusDescription = string;
  interface OnPoint {
    x: AedDevice.AddressPointX;
    y: AedDevice.AddressPointY;
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
export type AedDeviceAddressPointX = AedDevice.AddressPointX;
export type AedDeviceAddressPointY = AedDevice.AddressPointY;
export type AedDeviceAddressPic = AedDevice.AddressPic;
export type AedDeviceDevicePic = AedDevice.DevicePic;

export interface IAedDeviceRegister {
  uniqueNickname: AedDeviceUniqueNickname;
  modelName: AedDeviceModelName;
  description: AedDeviceModelDescription;
  defaultMapX: AedDeviceAddressPointX;
  defaultMapY: AedDeviceAddressPointY;
  address: AedDeviceAddress;
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

export interface IAedDevicePreview {
  id: AedDevice.AedDeviceId;
  uniqueNickname: AedDeviceUniqueNickname;
  modelName: AedDeviceModelName;
  description: AedDeviceModelDescription;
  status: AedDevice.Status;
  picUrl: AedDevice.DevicePic;
  address: AedDeviceAddress;
  onEventId: AedDevice.OnEventId;
  onUserId: AedDevice.OnUserId;
}

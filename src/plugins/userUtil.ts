import {
  UserInfo,
} from "@/types";
import {Promise} from "bluebird";
import {bufToJson, dataBuf, metadataBuf} from "@/plugins/api/rsocketUtil";
import {accessToken, userRSocket} from "@/plugins/api";
import {userApi} from "@/plugins/api/apiUrls";

export function setAddress(userInfo: UserInfo, address: UserInfo) {
  userInfo.city = address.city;
  userInfo.province = address.province;
  userInfo.countryCode = address.countryCode;
}

export function setProfile(userInfo: UserInfo, profile: UserInfo) {
  userInfo.avatar = profile.avatar;
  userInfo.description = profile.description;
}

export function setPhones(userInfo: UserInfo, phones: UserInfo) {
  userInfo.phones = phones.phones;
}

export function setRoles(userInfo: UserInfo, roles: UserInfo) {
  userInfo.roleModels = roles.roleModels;
}

export function setAvailability(userInfo: UserInfo, avail: UserInfo) {
  userInfo.online = avail.online;
  userInfo.availability = avail.availability;
}

export function setCore(userInfo: UserInfo, core: UserInfo) {
  userInfo.userid = core.userid;
  userInfo.username = core.username;
  userInfo.name = core.name;
  userInfo.surname = core.surname;
  userInfo.email = core.email;
}

export function setLogs(userInfo: UserInfo, logs: UserInfo) {
  userInfo.lastLogoutWeb = logs.lastLogoutWeb;
  userInfo.lastLoginWeb = logs.lastLoginWeb;
  userInfo.lastLogoutAndroid = logs.lastLogoutAndroid;
  userInfo.lastLoginAndroid = logs.lastLoginAndroid;
  userInfo.lastLogoutIos = logs.lastLogoutIos;
  userInfo.lastLoginIos = logs.lastLoginIos;
}

export function searchUserProfile (data: any): Promise<UserInfo> {
  return new Promise(resolve => {
    userRSocket.requestResponse({
      data: dataBuf(data),
      metadata: metadataBuf(accessToken, userApi.user)
    }).subscribe({
      onComplete: value => {
        resolve(JSON.parse(bufToJson(value)));
      }
    });
  })
}

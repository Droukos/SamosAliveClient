import {
  City,
  CountryCode,
  Description,
  Name, Phones, Province, Surname, User,
  UserInfo,
} from "@/types";
import UserId = User.UserId;
import Username = User.Username;
import Email = User.Email;
import Online = User.Online;
import Availability = User.Availability;
import Avatar = User.Avatar;
import RoleModels = User.RoleModels;

export function setAddress(userInfo: UserInfo, countryCode: CountryCode, province: Province, city: City) {
  userInfo.city = city;
  userInfo.province = province;
  userInfo.countryCode = countryCode;
}

export function setProfile(userInfo: UserInfo, profile: UserInfo) {
  userInfo.avatar = profile.avatar;
  userInfo.description = profile.description;
}

export function setPhones(userInfo: UserInfo, phones: Phones) {
  userInfo.phones = phones;
}

export function setAvailability(userInfo: UserInfo, online: Online, availability: Availability) {
  userInfo.online = online;
  userInfo.availability = availability;
}

export function setAvatar(userInfo: UserInfo, avatar: Avatar) {
  userInfo.avatar = avatar;
}

export function setDescription(userInfo: UserInfo, description: Description) {
  userInfo.description = description;
}

export function setRoleModels(userInfo: UserInfo, roles: RoleModels) {
  userInfo.roleModels = roles;
}

export function setNameSurname(userInfo: UserInfo, name: Name, surname: Surname) {
  userInfo.name = name;
  userInfo.surname = surname;
}

export function setUserIdUsername(userInfo: UserInfo, userid: UserId, username: Username) {
  userInfo.userid = userid;
  userInfo.username = username;
}

export function setEmail(userInfo: UserInfo, email: Email) {
  userInfo.email = email;
}

export function setCore(userInfo: UserInfo, core: UserInfo) {
  setUserIdUsername(userInfo, core.userid, core.username);
  setNameSurname(userInfo, core.name, core.surname);
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

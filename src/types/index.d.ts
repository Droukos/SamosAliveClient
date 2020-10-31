import {
  LocaleMessageArray,
  LocaleMessageObject,
  LocaleMessages,
  TranslateResult,
} from "vue-i18n";

declare namespace User {
  type UserId = string;
  type Username = string;
  type Password = string;
  type PasswordConfirmed = string;
  type Name = string;
  type Surname = string;
  type Email = string;

  type Avatar = string | null;
  type Description = string | null;
  type Phones = string[] | null;

  type CountryCode = string | null;
  type Country = string | null;
  type Province = string | null;
  type City = string | null;

  type LastLoginAndroid = number[] | null;
  type LastLoginIos = number[] | null;
  type LastLoginWeb = number[] | null;
  type LastLogoutAndroid = number[] | null;
  type LastLogoutIos = number[] | null;
  type LastLogoutWeb = number[] | null;
  type UserCreated = number[] | null;

  type Online = boolean | null;
  type Availability = number | null;

  interface PrivacySetting {
    type: number;
    users: string[];
  }
  interface Role {
    role: string;
    code: string;
    active: boolean;
    added: number[];
    addedBy: string;
  }

  type RoleModels = User.Role[] | undefined;

  type CreditsStat = {
    rating: number;
    emptyIcon: string;
    fullIcon: string;
    halfIcon: string;
    length: number;
    hover: boolean;
    readonly: boolean;
    size: number;
  };

  export interface UserInfo {
    userid: UserId;
    username: string;
    name: Name;
    surname: Surname;
    email: Email;

    avatar: User.Avatar;
    description: User.Description;
    phones: User.Phones;

    countryCode: User.CountryCode;
    province: User.Province;
    city: User.City;

    lastLoginAndroid: User.LastLoginAndroid;
    lastLogoutAndroid: User.LastLogoutAndroid;
    lastLoginIos: User.LastLoginIos;
    lastLogoutIos: User.LastLogoutIos;
    lastLoginWeb: User.LastLoginWeb;
    lastLogoutWeb: User.LastLogoutWeb;
    userCreated: User.UserCreated;

    online: User.Online;
    availability: User.Availability;
    roleModels: RoleModels;
  }
}

export type Role = User.Role;
export type Phones = User.Phones;
export type UserInfo = User.UserInfo;
export type CreditsStat = User.CreditsStat;
export type Name = User.Name;
export type Surname = User.Surname;
export type Description = User.Description;
export type CountryCode = User.CountryCode;
export type Province = User.Province;
export type City = User.City;
export type PrivacySetting = User.PrivacySetting;

export interface UserPrivacySets {
  userid: User.UserId;
  username: User.Username;
  onlineStatus: User.PrivacySetting;
  lastLogin: User.PrivacySetting;
  lastLogout: User.PrivacySetting;
  fullname: User.PrivacySetting;
  email: User.PrivacySetting;
  accCreated: User.PrivacySetting;
  description: User.PrivacySetting;
  address: User.PrivacySetting;
  phones: User.PrivacySetting;
}

export interface UpdateUserPrivacySets {
  userid: User.UserId;
  onStatus: User.PrivacySetting;
  lstLogin: User.PrivacySetting;
  lstLogout: User.PrivacySetting;
  name: User.PrivacySetting;
  addr: User.PrivacySetting;
  email: User.PrivacySetting;
  accC: User.PrivacySetting;
  desc: User.PrivacySetting;
  phone: User.PrivacySetting;
}

export interface UserRegister {
  username: User.Username;
  password: User.Password;
  passwordConfirmed: User.PasswordConfirmed;
  name: User.Name;
  surname: User.Surname;
  email: User.Email;
}

declare namespace Login {
  interface UserLogin {
    user: User.Username | User.Email;
    pass: User.Password;
  }

  interface LoginResponse {
    accessToken: string;
    userid: User.UserId;
    username: User.Username;
    name: User.Name;
    surname: User.Surname;
    email: User.Email;
    avatar: User.Avatar;
    description: User.Description;
    roleModels: User.Role[];
    online: User.Online;
    availability: User.Availability;
  }
}

export type UserLogin = Login.UserLogin;
export type LoginResponse = Login.LoginResponse;

export interface PersonalInfo {
  name: User.Name;
  surname: User.Surname;
  description: User.Description;
}

export interface Country {
  code: string;
  name: string;
}

export interface FileImg {
  selectedFile: File;
  validFileExtensions: string[];
  notUsedImgUpload: boolean;
}

export interface Tab {
  id: string;
  title: TranslateResult;
  counter: number;
  label: TranslateResult;
  searchLabel: string;
}

export interface RequestedPreviewUser {
  id: User.UserId;
  user: User.Username;
  name: User.Name;
  sur: User.Surname;
  avatar: User.Avatar;
  on: User.Online;
  status: User.Availability;
  roles: string[];
}

export interface UpdateUserPersonal {
  userid: User.UserId;
  name: User.Name;
  sur: User.Surname;
  desc: User.Description;
  ciso: User.CountryCode;
  state: User.Province;
  city: User.City;
}

declare namespace AedEvent {
  type occurrenceType = number;
  type address = string;
  type comment = string;
  type status = string;

  interface AedEventInfo {
    userid: User.UserId;
    username: User.Username;
    occurrenceType: AedEvent.occurrenceType;
    address: AedEvent.address;
    comment: AedEvent.comment;
    status: AedEvent.status;
  }
}
//export type occurrenceType = AedEvent.occurrenceType;
export type AedEventInfo = AedEvent.AedEventInfo;

declare namespace News {
  type id = string;
  type newsTitle = string;
  type content = string;

  interface NewsInfo {
    username: User.Username;
    newsTitle: News.newsTitle;
    content: News.content;
  }

  interface NewsMore {
    id: News.id;
    username: User.Username;
    newsTitle: News.newsTitle;
    content: News.content;
  }
}

export type NewsInfo = News.NewsInfo;
export type NewsMore = News.NewsMore;

declare namespace AedProblems {
  type title = string;
  type address = string;
  type info = string;
  type status = string;

  interface AedProblemsInfo {
    username: User.Username;
    title: AedProblems.title;
    address: AedProblems.address;
    info: AedProblems.info;
    status: AedProblems.status;
  }
}

export interface UpdateAvatar {
  userid: User.UserId;
  av: File;
}

export type AedProblemsInfo = AedProblems.AedProblemsInfo;

type Error =
  | string
  | LocaleMessages
  | LocaleMessageObject
  | LocaleMessageArray
  | undefined;

type Field = string | TranslateResult;
type Value = string;
type Show = boolean;
type Icon = string;
type SuccessMessage = string;

export type FieldObject = {
  f: Field;
  v: Value;
  e: Error;
  run: boolean;
  loading?: boolean;
  suMsg?: SuccessMessage;
  sh?: Show;
  i?: Icon;
};

export type UserIdDto = {
  userid: User.UserId
}

export type UsernameDto = {
  username: User.Username;
}

export type NewsDto = {
  id: News.id;
}

export type PrivacySetField = {
  index: number,
  i18n: string,
  type: number,
  users: string[],
}

export type PrivacyForm = {
  userPrivacy: PrivacySetField[]
}


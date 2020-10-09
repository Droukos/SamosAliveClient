import {TranslateResult} from "vue-i18n";

declare namespace User {
  type UserId = string;
  type Username = string;
  type Password = string;
  type PasswordConfirmed = string;
  type Name = string;
  type Surname = string;
  type Email = string;

  type Avatar = string;
  type Description = string;
  type Phones = string[];

  type CountryCode = string;
  type Country = string;
  type Province = string;
  type City = string;

  type LastLoginAndroid = number[] | undefined;
  type LastLoginIos = number[] | undefined;
  type LastLoginWeb = number[] | undefined;
  type LastLogoutAndroid = number[] | undefined;
  type LastLogoutIos = number[] | undefined;
  type LastLogoutWeb = number[] | undefined;
  type UserCreated = number[] | undefined;

  type Online = boolean;
  type Availability = number;
  interface Role {
    code: string;
    active: boolean;
    added: number[];
    addedBy: string;
  }

  type CreditsStat = {
    rating: number,
    emptyIcon: string,
    fullIcon: string,
    halfIcon: string,
    length: number,
    hover: boolean,
    readonly: boolean,
    size: number,
  }

  export interface UserInfo {
    userid: UserId;
    username: string;
    name: Name;
    surname: Surname;
    email: Email;

    avatar: User.Avatar | undefined;
    description: User.Description | undefined;
    phones: User.Phones | undefined;

    countryCode: User.CountryCode | undefined;
    province: User.Province | undefined;
    city: User.City | undefined;

    lastLoginAndroid: User.LastLoginAndroid | undefined;
    lastLogoutAndroid: User.LastLogoutAndroid | undefined;
    lastLoginIos: User.LastLoginIos | undefined
    lastLogoutIos: User.LastLogoutIos | undefined;
    lastLoginWeb: User.LastLoginWeb | undefined
    lastLogoutWeb: User.LastLogoutWeb | undefined;
    userCreated: User.UserCreated | undefined;

    online: User.Online | undefined;
    availability: User.Availability | undefined;
    roles: User.Role[] | undefined;
  }
}

export type Role = User.Role;
export type Phones = User.Phones;
export type UserInfo = User.UserInfo;
export type CreditsStat = User.CreditsStat;


export interface UserRegister {
  user: User.Username;
  pass: User.Password;
  passC: User.PasswordConfirmed;
  prsn : {
    name: User.Name
    sur: User.Surname;
  };
  email: User.Email;
}

declare namespace Login {
  interface UserLogin {
    user: User.Username | User.Email;
    pass: User.Password;
  }

  interface LoginResponse {
    accessToken: string,
    userid: User.UserId,
    username: User.Username,
    name: User.Name,
    surname: User.Surname,
    email: User.Email,
    avatar: User.Avatar | undefined,
    description: User.Description | undefined,
    roles: User.Role[],
    online: User.Online,
    availability: User.Availability
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

export interface EditForm {
  name: User.Name,
  surname: User.Surname,
  avatar: User.Avatar,
  description: User.Description,
  countryCode: User.CountryCode,
  province: User.Province,
  country: User.Country,
  city: User.City
  phones: User.Phones
}

export interface FileImg {
  selectedFile: File,
  validFileExtensions: string[],
  notUsedImgUpload: boolean
}

export interface Tab {
  id: string,
  title: TranslateResult,
  counter: number,
  label: TranslateResult,
  searchLabel: string
}

declare namespace AedEvent {
  type occurrenceType = string;
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
  type newsTitle = string;
  type content = string;

  interface NewsInfo {
    userid: User.UserId;
    username: User.Username;
    newsTitle: News.newsTitle;
    content: News.content;
  }
}

export type NewsInfo = News.NewsInfo;

declare namespace AedProblems {
  type title = string;
  type address = string;
  type info = string;
  type status = string;

  interface AedProblemsInfo {
    userid: User.UserId;
    username: User.Username;
    title: AedProblems.title;
    address: AedProblems.address;
    info: AedProblems.info;
    status: AedProblems.status;
  }
}
export type AedProblemsInfo = AedProblems.AedProblemsInfo;

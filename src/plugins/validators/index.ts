import i18n from "@/plugins/i18n";
import { authRSocketApi} from "@/plugins/api";
import "@/plugins/validators";
import { authApi } from "@/plugins/api/apiUrls";
import {
  TranslateResult,
} from "vue-i18n";
import {
  bufToJson,
  dataBuf,
  metadataOnlyRoute,
} from "@/plugins/api/rsocketUtil";
import {FieldObject} from "@/types";

export default class Validator {
  obj!: FieldObject;
  foundError: string | TranslateResult = "";

  constructor(obj: FieldObject) {
    this.obj = obj;
    this.obj.run = true;
  }

  required(): Validator {
    if (this.foundError != "") return this;
    this.foundError =
      this.obj.v.length !== 0
        ? ""
        : i18n.t("validations.required", [this.obj.f]);
    return this;
  }

  regexUsername(): Validator {
    if (this.foundError != "") return this;
    const re = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/;
    this.foundError = re.test(this.obj.v)
      ? ""
      : i18n.t("validations.usernameRegex");
    return this;
  }

  regexPass(): Validator {
    if (this.foundError != "") return this;
    const re = /^(?=.*\d)(?=.*[a-z])(?!.*\s).{6,120}$/;
    this.foundError = re.test(this.obj.v)
      ? ""
      : i18n.t("validations.passRegex");
    return this;
  }

  regexEmail(): Validator {
    if (this.foundError != "") return this;
    const re = /\S+@\S+\.\S+/;
    this.foundError = re.test(this.obj.v)
      ? ""
      : i18n.t("validations.fieldInvalid", [this.obj.f]);
    return this;
  }

  passConfirmation(valueMatch: string): Validator {
    if (this.foundError != "") return this;
    this.foundError =
      this.obj.v === valueMatch ? "" : i18n.t("validations.passMatch");
    return this;
  }

  max(max: number): Validator {
    if (this.foundError != "") return this;
    this.foundError =
      this.obj.v.length > max
        ? i18n.t("validations.max", [this.obj.f, this.obj.v.length])
        : "";
    return this;
  }

  min(min: number): Validator {
    if (this.foundError != "") return this;
    this.foundError =
      this.obj.v.length > min
        ? i18n.t("validations.min", [this.obj.f, this.obj.v.length])
        : "";
    return this;
  }

  minmax(min: number, max: number): Validator {
    if (this.foundError != "") return this;
    this.foundError =
      this.obj.v.length >= min && this.obj.v.length <= max
        ? ""
        : i18n.t("validations.between", [this.obj.f, min, max]);
    return this;
  }

  async uniqueUsername() {
    if (this.obj.v.length < 2) return;

   authRSocketApi()
      .requestResponse({
        data: dataBuf({ user: this.obj.v }),
        metadata: metadataOnlyRoute(authApi.checkUsername),
      })
      .subscribe({
        onComplete: (value) => {
          if (bufToJson(value) == "false") {
            this.obj.e = i18n.t("validations.fieldTaken", [
              i18n.t("fields.username"),
            ]);
          }
        },
      });
  }

  async uniqueEmail() {
    if (this.obj.v.length < 5) return;

   authRSocketApi()
      .requestResponse({
        data: dataBuf({ user: this.obj.v }),
        metadata: metadataOnlyRoute(authApi.checkEmail),
      })
      .subscribe({
        onComplete: (value) => {
          if (bufToJson(value) == "false") {
            this.obj.e = i18n.t("validations.fieldTaken", [
              i18n.t("fields.email"),
            ]);
          }
        },
      });
  }

  validate() {
    this.obj.e = this.foundError;
    this.foundError = "";
  }
}

function uniqueProcess(obj: FieldObject) {
  if (obj.e == "") {
    obj.i = "$checkOut";
    obj.suMsg = i18n.t("validations.fieldNotTaken") as string;
  } else {
    obj.i = "$cancel";
    obj.suMsg = "";
  }
}

export function validateUniqueUsername(username: FieldObject) {
  if (username.i != "$cancel" && username.i != "$checkOut") {
    username.loading = true;
    new Validator(username)
      .uniqueUsername()
      .then(() => uniqueProcess(username));
    username.loading = false;
  }
}

export function validateUniqueEmail(email: FieldObject) {
  if (email.i != "$cancel" && email.i != "$checkOut") {
    email.loading = true;
    new Validator(email).uniqueEmail().then(() => uniqueProcess(email));
    email.loading = false;
  }
}

export function validateUsername(username: FieldObject) {
  new Validator(username)
    .required()
    .minmax(3, 30)
    .regexUsername()
    .validate();

  username.suMsg = "";
  if (username.e == "") {
    username.sh = true;
    username.i = "$helpCircleOut";
  } else username.sh = false;
}

export function validateDescription(description: FieldObject) {
  new Validator(description).max(250).validate();
}

export function validatePassword(pass: FieldObject, passC: FieldObject) {
  pass.sh
    ? new Validator(pass)
        .required()
        .regexPass()
        .validate()
    : new Validator(pass)
        .required()
        .regexPass()
        .passConfirmation(passC.v)
        .validate();
}

export function validatePassConf(passC: FieldObject, pass: FieldObject) {
  new Validator(passC).required().validate();

  new Validator(pass).passConfirmation(passC.v).validate();
}

export function validateName(name: FieldObject) {
  new Validator(name)
    .required()
    .minmax(2, 30)
    .validate();
}

export function validateSurname(surname: FieldObject) {
  new Validator(surname)
    .required()
    .minmax(2, 30)
    .validate();
}

export function validateEmail(email: FieldObject) {
  new Validator(email)
    .required()
    .regexEmail()
    .validate();
  email.suMsg = "";
  if (email.e == "") {
    email.sh = true;
    email.i = "$helpCircleOut";
  }
}

export function clearUserData(user: FieldObject) {
  user.v = "";
  user.suMsg = "";
  user.sh = false;
  user.run = false;
}

export function clearPassData(pass: FieldObject) {
  pass.v = "";
  pass.run = false;
}

export function clearPassCData(passC: FieldObject) {
  passC.v = "";
  passC.run = false;
}

export function clearNameData(name: FieldObject) {
  name.v = "";
  name.run = false;
}

export function clearSurnameData(surname: FieldObject) {
  surname.v = "";
  surname.run = false;
}

export function clearEmailData(email: FieldObject) {
  email.v = "";
  email.suMsg = "";
  email.sh = false;
  email.run = false;
}

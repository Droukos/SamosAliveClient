<template>
  <VMain>
    <v-container>
      <p
        class="display-1"
        style="color:#00897B"
        v-text="$t('register.header')"
      />
      <VTextField
        v-model="user.v"
        @input="validUsername()"
        :success-messages="user.suMsg"
        :loading="user.loading"
        :error-messages="user.e"
        :counter="30"
        :label="user.f"
        prepend-icon="$account"
        :append-icon="user.sh ? user.i : ''"
        @click:append="checkUniqueUsername()"
        required
      />

      <VTextField
        v-model="pass.v"
        @input="validPass()"
        :append-icon="pass.sh ? '$eye' : '$eyeOff'"
        prepend-icon="$key"
        :type="pass.sh ? 'text' : 'password'"
        :error-messages="pass.e"
        name="input-10-1"
        :label="pass.f"
        :counter="120"
        @click:append="showPass()"
      />
      <v-expand-transition>
        <div v-show="!pass.sh">
          <VTextField
            v-model="passC.v"
            @input="validPassC()"
            :append-icon="passC.sh ? '$eye' : '$eyeOff'"
            prepend-icon="$keyOut"
            :type="passC.sh ? 'text' : 'password'"
            :error-messages="passC.e"
            name="input-10-1"
            :label="passC.f"
            :counter="120"
            @click:append="passC.sh = !passC.sh"
          />
        </div>
      </v-expand-transition>

      <VTextField
        v-model="name.v"
        @input="validName()"
        :error-messages="name.e"
        :counter="30"
        :label="name.f"
        prepend-icon="$accountOut"
        required
      />

      <VTextField
        v-model="surname.v"
        @input="validSurname()"
        :error-messages="surname.e"
        :counter="30"
        :label="surname.f"
        prepend-icon="$accountOut"
        required
      />

      <VTextField
        v-model="email.v"
        @input="validEmail()"
        :success-messages="email.suMsg"
        :loading="email.loading"
        :error-messages="email.e"
        :label="email.f"
        :counter="120"
        :append-icon="email.sh ? email.i : ''"
        @click:append="checkUniqueEmail()"
        prepend-icon="$email"
        required
      />

      <p class="text-justify">
        {{ $t("login.message") }}
        <VBtn
          rounded
          small
          @click="toLogin()"
          aria-label="ToLogin"
          v-text="$t('login.title')"
        />
      </p>
      <VBtn
        class="mr-4"
        @click="submit()"
        :disabled="invalid"
        aria-label="Register"
        v-text="$t('register.title')"
      />
      <VBtn @click="clear" aria-label="Clear" v-text="$t('clear')" />
    </v-container>
  </VMain>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { UserRegister } from "@/types";

import {
  clearEmailData,
  clearNameData,
  clearPassCData,
  clearPassData,
  clearSurnameData,
  clearUserData,
  validateEmail,
  validateName,
  validatePassConf,
  validatePassword,
  validateSurname,
  validateUniqueEmail,
  validateUniqueUsername,
  validateUsername
} from "@/plugins/validators";

const user = namespace("user");

@Component({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const regCard = vm as RegistrationCard;
      if (regCard.$cookies.isKey("loggedIn") || regCard.userid !== "") {
        regCard.$router.push({
          name: "aedEvent"
        });
      }
    });
  }
})
export default class RegistrationCard extends Vue {
  user = {
    f: this.$t("fields.username"),
    v: "",
    e: "",
    run: false,
    loading: false,
    suMsg: "",
    sh: false,
    i: "$helpCircleOut"
  };
  pass = {
    f: this.$t("fields.password"),
    v: "",
    e: "",
    run: false,
    sh: false
  };
  passC = {
    f: this.$t("fields.passwordConf"),
    v: "",
    e: "",
    run: false,
    sh: false
  };
  name = {
    f: this.$t("fields.name"),
    v: "",
    e: "",
    run: false
  };
  surname = {
    f: this.$t("fields.surname"),
    v: "",
    e: "",
    run: false
  };
  email = {
    f: this.$t("fields.email"),
    v: "",
    e: "",
    run: false,
    loading: false,
    suMsg: "",
    sh: false,
    i: "$helpCircleOut"
  };
  invalid = true;

  @user.State userid!: string;
  @user.Action registerUser!: (data: UserRegister) => Promise<string>;

  showPass() {
    this.pass.sh = !this.pass.sh;
    this.vPassword();
  }

  checkUniqueUsername = () => validateUniqueUsername(this.user);
  checkUniqueEmail = () => validateUniqueEmail(this.email);
  vUsername = () => validateUsername(this.user);
  vPassword = () => validatePassword(this.pass, this.passC);
  vPassConfirmed = () => validatePassConf(this.passC, this.pass);
  vName = () => validateName(this.name);
  vSurname = () => validateSurname(this.surname);
  vEmail = () => validateEmail(this.email);
  vForm() {
    this.user.run &&
    this.pass.run &&
    (this.pass.sh || this.passC.run) &&
    this.name.run &&
    this.surname.run &&
    this.email.run &&
    this.user.e == "" &&
    this.pass.e == "" &&
    (this.pass.sh || this.passC.e == "") &&
    this.name.e == "" &&
    this.surname.e == "" &&
    this.email.e == ""
      ? (this.invalid = false)
      : (this.invalid = true);
  }

  validUsername = () => this.validateForm(this.vUsername);
  validPass = () => this.validateForm(this.vPassword);
  validPassC = () => this.validateForm(this.vPassConfirmed);
  validName = () => this.validateForm(this.vName);
  validSurname = () => this.validateForm(this.vSurname);
  validEmail = () => this.validateForm(this.vEmail);

  validateForm(func: () => void) {
    func();
    this.vForm();
  }

  submit() {
    if (!this.invalid) {
      this.checkUniqueUsername();
      this.checkUniqueEmail();

      if (this.user.e != "" || this.email.e != "") return;
      if (this.pass.sh) this.passC.v = this.pass.v;

      this.registerUser({
        username: this.user.v,
        password: this.pass.v,
        passwordConfirmed: this.passC.v,
        name: this.name.v,
        surname: this.surname.v,
        email: this.email.v
      }).then(() => {
        this.toValidation();
      });
    }
  }
  clear() {
    clearUserData(this.user);
    clearPassData(this.pass);
    clearPassCData(this.passC);
    clearNameData(this.name);
    clearSurnameData(this.surname);
    clearEmailData(this.email);
  }
  toLogin() {
    this.$router.push({
      name: "login"
    });
  }
  toValidation() {
    this.$router.push({
      name: "login" //Change to validation
    });
  }
}
</script>

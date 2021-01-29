<template>
  <form>
    <v-text-field
      v-model="user.v"
      @input="vUsername()"
      :error-messages="user.e"
      :counter="30"
      :label="user.f"
      prepend-icon="$account"
      required
    />

    <v-text-field
      v-model="pass.v"
      @input="vPassword()"
      :append-icon="pass.sh ? '$eye' : '$eyeOff'"
      :type="pass.sh ? 'text' : 'password'"
      :error-messages="pass.e"
      name="input-10-1"
      :label="pass.f"
      :counter="120"
      prepend-icon="$key"
      @click:append="pass.sh = !pass.sh"
    />

    <p
      class="text-justify red--text"
      v-if="sessExp"
      v-text="$t('login.sessionExp')"
    />
    <v-btn
      text
      color="primary"
      aria-label="ForgotPass"
      v-text="$t('login.forgotPass')"
    />
    <v-btn
      @click="submit()"
      block
      class="mt-2"
      :disabled="invalid"
      aria-label="Login"
      v-text="$t('login.title')"
    />
    <p
      :class="[
        invalidCredentials
          ? 'text-justify red--text'
          : 'text-justify red--text d-none'
      ]"
      v-text="$t('login.invalid')"
    />
    <p class="text-justify mt-2">
      {{ $t("register.message") }}
      <v-btn
        rounded
        small
        @click="toRegister()"
        aria-label="ToRegister"
        v-text="$t('register.title')"
      />
    </p>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { UserLogin } from "@/types";
import Validator from "@/plugins/validators";
import { updateAccToken } from "@/plugins/api";

const user = namespace("user");

@Component
export default class LoginBase extends Vue {
  user = {
    f: this.$t("fields.username") + "/" + this.$t("fields.email"),
    v: "",
    e: "",
    run: false
  };
  pass = {
    f: this.$t("fields.password"),
    v: "",
    e: "",
    run: false,
    sh: false
  };
  invalid = true;
  invalidCredentials = false;

  @user.Action listenAuth!: () => void;
  @user.Action loginUser!: (data: UserLogin) => Promise<void>;

  @Prop() sessExp!: boolean;
  vUsername() {
    new Validator(this.user)
      .required()
      .minmax(3, 30)
      .regexUsername()
      .validate();
    this.vForm();
  }
  vPassword() {
    new Validator(this.pass).required().validate();
    this.vForm();
  }
  vForm() {
    this.user.run && this.pass.run && this.user.e == "" && this.pass.e == ""
      ? (this.invalid = false)
      : (this.invalid = true);
  }

  submit() {
    if (!this.invalid) {
      this.loginUser({
        user: this.user.v,
        pass: this.pass.v
      })
        .then(() => {
          updateAccToken();
          this.listenAuth();
          this.$router.push({
            name: "aedEvent"
          });
        })
        .catch(() => {
          this.invalidCredentials = true;
        });
    }
  }
  clear() {
    this.user.v = "";
    this.user.e = "";
    this.pass.v = "";
    this.pass.e = "";
  }
  toRegister() {
    this.$router.push({
      name: "register"
    });
  }
}
</script>

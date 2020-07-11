<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, handleSubmit }">
    <form>
      <ValidationProvider
        v-slot="{ errors }"
        :name="$t('fields.username')"
        rules="required|minmax:3,30"
      >
        <v-text-field
          v-model="form.username"
          :error-messages="errors"
          :counter="30"
          :label="$t('fields.username')+'/'+$t('fields.email')"
          prepend-icon="$vuetify.icons.account"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        :name="$t('fields.password')"
        rules="required|minmax:6,120"
      >
        <v-text-field
          v-model="form.password"
          :append-icon="showPassword ? '$vuetify.icons.eye' : '$vuetify.icons.eyeoff'"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="errors"
          name="input-10-1"
          :label="$t('fields.password')"
          :counter="120"
          prepend-icon="$vuetify.icons.key"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </ValidationProvider>

      <p class="text-justify red--text" v-if="sessExp">{{ $t('login.sessionExp') }}</p>
      <v-btn text color="primary" aria-label="ForgotPass">{{$t("login.forgotpass")}}</v-btn>
      <v-btn
        @click="handleSubmit(submit)"
        block
        class="mt-2"
        :disabled="invalid"
        aria-label="Login"
      >{{$t("login.title")}}</v-btn>
      <p
       :class="[invalidCredentials ? 'text-justify red--text' : 'text-justify red--text d-none']"
      >{{ $t('login.invalid') }}</p>
      
      <p class="text-justify mt-2">
        {{ $t('register.message') }}
        <v-btn
          rounded
          small
          @click="toRegister()"
          aria-label="ToRegister"
        >{{ $t('register.title') }}</v-btn>
      </p>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { veevalidate } from "@/plugins/vee-validate.js";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      showPassword: false,
      invalidCredentials: false
    };
  },
  props: ["sessExp"],
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    submit() {
      let vm = this;
      this.$refs.observer.validate().then(valid => {
        let data = { user: vm.form.username, pass: vm.form.password };
        if (valid) {
          vm.$store
            .dispatch("loginUser", data)
            .then(response => {
              vm.$store.commit("setUserData", response.data);
              this.$cookies.set("refToken",response.data.refresh_token,null,null,null,null,"Strict");
              this.$cookies.set("accToken",response.data.access_token,null,null,null,null,"Strict");
              vm.$router.push({
                name: "news"
              });
            }).catch(error => {
              vm.invalidCredentials = true;
            });
        }
      });
    },
    clear() {
      this.form.username = "";
      this.form.password = "";
      this.$refs.observer.reset();
    },
    toRegister() {
      this.$router.push({
        name: "register"
      });
    }
  }
};
</script>

<style>
</style>
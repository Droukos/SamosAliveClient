<template>
  <v-main>
    <v-container transition="fab-transition">
      <p class="display-1" style="color:#00897B">{{ $t('login.header') }}</p>
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
          <p class="text-justify">
            {{ $t('register.message') }}
            <v-btn rounded small @click="toRegister()" aria-label="ToRegister">{{ $t('register.title') }}</v-btn>
          </p>
          <p class="text-justify red--text" v-if="showSessionExpired"> {{ $t('login.sessionExp') }} </p>
          <v-btn class="mr-4" @click="handleSubmit(submit)" :disabled="invalid" aria-label="Login">{{$t("login.title")}}</v-btn>
          <v-btn @click="clear" aria-label="Clear">{{$t("clear")}}</v-btn>
          <p :class="[invalidCredentials ? 'text-justify red--text' : 'text-justify red--text d-none']"> {{ $t('login.invalid') }}</p>
        </form>
      </ValidationObserver>
    </v-container>
  </v-main>
</template>


<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
//import { required, minmax } from 'vee-validate/dist/rules';
import VueCookies from 'vue-cookies';
//import (/* webpackChunkName: "VeeVal" */ "@/plugins/vee-validate.js");
import { veevalidate } from "@/plugins/vee-validate.js";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      showPassword: false,
      showSessionExpired: false,
      invalidCredentials: false
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    submit() {
      let vm = this;
      this.$refs.observer.validate().then(valid => {
        console.log(vm.form.username);
        let data = { user: vm.form.username, pass: vm.form.password};
        if (valid) {
          vm.$store.dispatch("loginUser", data)
          .then(response => {
                vm.$store.commit('setUserData', response.data);
                VueCookies.set("refToken", response.data.refresh_token, null, null, null, null, "Strict");
                VueCookies.set("accToken", response.data.access_token, null, null, null, null, "Strict");
                vm.$router.push({
                 name: 'news'
                });
            }).catch(error => {
                console.log(error.response.data);
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
  },
  computed: {

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.s == "expired") vm.showSessionExpired = true;
    });
  }
};
</script>
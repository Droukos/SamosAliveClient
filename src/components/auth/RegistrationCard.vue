<template>
  <v-content>
    <v-container>
      <p class="display-1" style="color:#00897B">{{ $t('register.header') }}</p>
      <ValidationObserver ref="observer" v-slot="{ invalid, handleSubmit }">
        <form action id="loginForm" method="POST">
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('fields.username')"
            :rules="{required: true, username_regex:/^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/, min:3,max:30, unique_username: (domain + 'auth/check_username', form.username)}"
            :debounce="500"
          >
            <v-text-field
              v-model="form.username"
              :error-messages="errors"
              :counter="30"
              :label="$t('fields.username')"
              prepend-icon="mdi-account"
              required
            ></v-text-field>
          </ValidationProvider>

          <ValidationObserver>
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('fields.password')"
              :rules="{ required: true, password_regex:/^(?=.*\d)(?=.*[a-z])(?!.*\s).{6,120}$/ ,Password:['@Confirmation'] }"
            >
              <v-text-field
                v-model="form.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-icon="mdi-lock-open-outline"
                :type="showPassword ? 'text' : 'password'"
                :error-messages="errors"
                name="input-10-1"
                :label="$t('fields.password')"
                :counter="120"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('fields.passwordConf')"
              vid="Confirmation"
              rules="required|max:120"
            >
              <v-text-field
                v-model="form.password_confirmed"
                :append-icon="showPasswordConf ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-icon="mdi-lock-open-outline"
                :type="showPasswordConf ? 'text' : 'password'"
                :error-messages="errors"
                name="input-10-1"
                :label="$t('fields.passwordConf')"
                :counter="120"
                @click:append="showPasswordConf = !showPasswordConf"
              ></v-text-field>
            </ValidationProvider>
          </ValidationObserver>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('fields.name')"
            rules="required|minmax:2,30"
          >
            <v-text-field
              v-model="form.name"
              :error-messages="errors"
              :counter="30"
              :label="$t('fields.name')"
              prepend-icon="mdi-account-star"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('fields.surname')"
            rules="required|minmax:2,30"
          >
            <v-text-field
              v-model="form.surname"
              :error-messages="errors"
              :counter="30"
              :label="$t('fields.surname')"
              prepend-icon="mdi-account-star"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="$t('fields.email')"
            rules="required|regex_email|unique_email"
            :debounce="500"
          >
            <v-text-field
              v-model="form.email"
              :error-messages="errors"
              :label="$t('fields.email')"
              :counter="120"
              prepend-icon="mdi-email-outline"
              required
            ></v-text-field>
          </ValidationProvider>

          <p class="text-justify">
            {{ $t('login.message') }}
            <v-btn rounded small @click="toLogin()">{{ $t('login.title') }}</v-btn>
          </p>
          <v-btn class="mr-4" @click="handleSubmit(submit)" :disabled="invalid">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>
      </ValidationObserver>
    </v-container>
  </v-content>
</template>


<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { veevalidate } from "@plugins/vee-validate.js";
import { email } from "vee-validate/dist/rules";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        password_confirmed: "",
        name: "",
        surname: "",
        email: ""
      },
      //loginRun: this.domain() + "login/run",
      domainAuth: this.domain + "auth/",
      showPassword: false,
      showPasswordConf: false
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
        if (valid) {
          let data = { 
            username: vm.form.username, 
            password: vm.form.password,
            password_confirmed: vm.form.password_confirmed,
            name: vm.form.name,
            surname: vm.form.surname,
            email: vm.form.email
          };
          vm.$store.dispatch('registerUser', data)
          .then(response => {
                vm.$router.push({
                 name: 'login'
                });
            }).catch(error => {
                console.log(error.response.data);
          });
        }
      });
    },
    clear() {
      this.form.username = "";
      this.form.password = "";
      this.form.password_confirmed = "";
      this.form.name = "";
      this.form.surname = "";
      this.form.email = "";
      this.$refs.observer.reset();
    },
    toLogin() {
      this.$router.push({
        name: "login"
      });
    }
  },
  computed: {
    domain() {
      return this.$store.getters.getDomain;
    }
  }
};
</script>
<style>
body {
  font-family: "Roboto";
}
h1 {
  text-align: center;
}
</style>
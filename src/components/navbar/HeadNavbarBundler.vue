<template>
  <v-card class="mx-auto overflow-hidden">
    <div v-if="!isSignedIn">
      <v-app-bar app clipped-left color="deep-purple darken-3" dense>
        <v-btn router-link to="/login" aria-label="ToLogin">
          <v-icon>{{ '$vuetify.icons.info' }}</v-icon>
        </v-btn>
         <v-spacer />
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ '$vuetify.icons.account' }}</v-icon>
            </v-btn>
          </template>
          <v-card class="mx-auto" >
              <v-container>
                <div class="d-flex justify-center mb-6"><h2>{{$t("login.loginTo")}}</h2></div>
                <login-base :sessExp="false"></login-base>
            </v-container>
          </v-card>
          
        </v-menu>
       
        <!--<v-btn router-link to="/info" aria-label="ToInfo">
          <v-icon>{{ '$vuetify.icons.info' }}</v-icon>
        </v-btn>-->
        <v-btn text router-link to="/settings" aria-label="ToSettings">
          <v-icon>{{ '$vuetify.icons.settings' }}</v-icon>
        </v-btn>
        <!--<v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" aria-label="Language">
              <v-icon>{{ '$vuetify.icons.translate' }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in langs" :key="index" @click="selLanguage(index)">
              <v-list-item-title>{{item.label}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>-->
      </v-app-bar>
    </div>

    <div v-if="isSignedIn">
      <navigation-drawer></navigation-drawer>
    </div>
  </v-card>
</template>

<script>

export default {
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      langs: [
        {
          index: 0,
          lang: "en",
          label: "English"
        },
        {
          index: 1,
          lang: "el",
          label: "Ελληνικά"
        }
      ]
    };
  },
  components: {
    NavigationDrawer: () =>
      import(
       /* webpackChunkName: "NavigationDrawer" */ "@/components/navbar/NavigationDrawer"
      ),
      LoginBase: () =>
      import(
       /* webpackChunkName: "LoginBase" */ "@/components/auth/LoginBase"
      ),
    },
  methods: {
    selLanguage(index) {
      this.$store.commit("setLocale", {locale: this.langs[index].lang});
      this.$cookies.set("userdata-lang", this.langs[index].lang, null, null, null, null, "Strict");
      this.$i18n.locale = this.langs[index].lang;
    },
    toRegister() {
      this.$router.push({
        name: "register"
      });
    }
  },
  computed: {
    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },
  }
};
</script>
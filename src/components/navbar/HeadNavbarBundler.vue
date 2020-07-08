<template>
  <v-card class="mx-auto overflow-hidden">
    <div v-if="!isSignedIn">
      <v-app-bar app clipped-left color="deep-purple darken-3" dense>
        <v-btn router-link to="/login" aria-label="ToLogin">
          <v-icon>{{ '$vuetify.icons.back' }}</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn router-link to="/info" aria-label="ToInfo">
          <v-icon>{{ '$vuetify.icons.info' }}</v-icon>
        </v-btn>
        <v-btn router-link to="/settings" aria-label="ToSettings">
          <v-icon>{{ '$vuetify.icons.settings' }}</v-icon>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" aria-label="Language">
              <v-icon>{{ '$vuetify.icons.translate' }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in langs" :key="index" @click="selLanguage(index)">
              <v-list-item-title>{{item.label}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
    },
  methods: {
    selLanguage(index) {
      this.$store.commit("setLocale", {locale: this.langs[index].lang});
      this.$cookies.set("userdata-lang", this.langs[index].lang, null, null, null, null, "Strict");
      this.$i18n.locale = this.langs[index].lang;
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.$vuetify.theme.dark = this.isDarkMode;
    },
  },
  computed: {
    getIsDarkMode() {
      return this.$store.getters.getIsDarkMode;
    },
    isSignedIn() {
      return this.$store.getters.isSignedIn;
    },
  }
};
</script>
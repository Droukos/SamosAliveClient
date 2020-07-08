<template>
  <v-main>
    <div>
      <h5 v-text="$t('settings.message')"/>
      <h6 v-text="$t('settings.theme')"/>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
          <v-btn rounded v-on="on" aria-label="Theme">
            <v-icon>{{ '$vuetify.icons.theme' }}</v-icon>
          </v-btn>
      </template>
      <v-list>
          <v-list-item v-for="(item, index) in themes" :key="index" @click="selTheme(index)">
              <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
      </v-list>
      </v-menu>
      <br>
      <h6 v-text="$t('settings.language')"/>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
          <v-btn rounded v-on="on" aria-label="Language">
            <v-icon>{{ '$vuetify.icons.translate' }}</v-icon>
          </v-btn>
      </template>
      <v-list>
          <v-list-item v-for="(item, index) in langs" :key="index" @click="selLanguage(index)">
              <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
      </v-list>
      </v-menu>
    </div>
  </v-main>
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
      ],
    };
  },
  methods: {
    selLanguage(index) {
      this.$store.commit("setLocale", {locale: this.langs[index].lang});
      this.$cookies.set("userdata-lang", this.langs[index].lang, null, null, null, null, "Strict");
      this.$i18n.locale = this.langs[index].lang;
    },
    selTheme(index) {
      this.$store.commit('setTheme', this.themes[index].mode);
      this.$cookies.set("userdata-theme", this.themes[index].mode, null, null, null, null, "Strict");
      this.$vuetify.theme.dark = this.getIsDarkMode;
    }
  },
  computed: {
    getIsDarkMode() {
      return this.$store.getters.getIsDarkMode;
    },
    themes() {
     return [
        {
          index: 0,
          mode: "dark",
          label: "Dark"
        },
        {
          index: 1,
          mode: "white",
          label: "White"
        }
      ]
    }
  }
};

</script>
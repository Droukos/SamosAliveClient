<template>
  <div>
    <h5 v-text="$t('settings.message')"/>
    <h6 v-text="$t('settings.theme')"/>
    <v-btn rounded @click="toggleTheme()">
      <v-icon>{{isDarkMode? '$vuetify.icons.moon' : '$vuetify.icons.sun'}}</v-icon>
    </v-btn>
    <br>
    <h6 v-text="$t('settings.language')"/>
    <v-menu offset-y>
    <template v-slot:activator="{ on }">
        <v-btn rounded v-on="on">{{ $t("lang") }}</v-btn>
    </template>
    <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="selLanguage(index)">
            <v-list-item-title>{{item.label }}</v-list-item-title>
        </v-list-item>
    </v-list>
    </v-menu>
  </div>
</template>


<script>
export default {
    data() {
    return {
      isDarkMode: false,
      items: [
        {
          index: 0,
          lang: "en",
          label: "English"
        },
        {
          index: 1,
          lang: "gr",
          label: "Ελληνικά"
        }
      ]
    };
  },
  methods: {
    selLanguage(index) {
      this.$i18n.locale = this.items[index].lang;
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.$vuetify.theme.dark = this.isDarkMode;
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
<template>
  <v-main>
    <div>
      <h5 v-text="$t('settings.message')" />
      <h6 v-text="$t('settings.theme')" />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn rounded v-on="on" aria-label="Theme">
            <v-icon>{{ "$vuetify.icons.theme" }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in themes"
            :key="index"
            @click="selTheme(index)"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <br />
      <h6 v-text="$t('settings.language')" />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn rounded v-on="on" aria-label="Language">
            <v-icon>{{ "$vuetify.icons.translate" }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in languages"
            :key="index"
            @click="selLanguage(index)"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const environment = namespace("environment");
@Component
export default class SettingsCard extends Vue {
  languages = [
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
  ];
  @environment.Getter public isDarkMode!: boolean;
  @environment.Mutation public setTheme!: (data: string) => void;
  @environment.Mutation public setLocale!: (data: string) => void;

  selLanguage(index: number) {
    this.setLocale(this.languages[index].lang);
    this.$cookies.set(
      "userdata-lang",
      this.languages[index].lang,
      new Date(2022, 11, 24, 10, 33, 30, 0),
      undefined,
      undefined,
      undefined,
      "Strict"
    );
    this.$i18n.locale = this.languages[index].lang;
  }

  selTheme(index: number) {
    this.setTheme(this.themes[index].mode);
    this.$cookies.set(
      "userdata-theme",
      this.themes[index].mode,
      new Date(2022, 11, 24, 10, 33, 30, 0),
      undefined,
      undefined,
      undefined,
      "Strict"
    );
    this.$vuetify.theme.dark = this.isDarkMode;
  }

  get themes() {
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
    ];
  }
}
</script>

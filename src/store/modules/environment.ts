import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true })
export default class Environment extends VuexModule {
  locale = "en";
  domain = document
    .querySelector('meta[name="serve"]')!
    .getAttribute("content")!;
  theme = "dark";

  @Mutation
  setTheme(data: string) {
    this.theme = data;
  }
  @Mutation
  setLocale(locale: string) {
    this.locale = locale;
  }

  get isDarkMode() {
    return this.theme === "dark";
  }
}

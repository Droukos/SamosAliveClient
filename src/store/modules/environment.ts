import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true })
export default class Environment extends VuexModule {
  locale = "en";
  domain = document
    .querySelector('meta[name="serve"]')!
    .getAttribute("content")!;
  theme = "dark";
  toggleExclusive = 0;
  subNavBarO = 0;

  @Mutation
  setTheme(data: string) {
    this.theme = data;
  }
  @Mutation
  setLocale(locale: string) {
    this.locale = locale;
  }
  @Mutation
  setSubNavBarOpen(index: number) {
    this.subNavBarO = index;
  }

  @Mutation
  setXsMenuIndex(index: number) {
    this.toggleExclusive = index;
  }

  get isDarkMode() {
    return this.theme === "dark";
  }
  get xsMenuIndex() {
    return this.toggleExclusive;
  }

  get subNavBarOpen() {
    return this.subNavBarO;
  }
}

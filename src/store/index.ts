import Vue from "vue";
import Vuex from "vuex";
import environment from "@/store/modules/environment";
import user from "@/store/modules/user";
import profile from "@/store/modules/profile";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    environment: environment,
    user: user,
    profile: profile
  }
});

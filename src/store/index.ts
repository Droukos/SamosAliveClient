import Vue from "vue";
import Vuex from "vuex";
import environment from "@/store/modules/environment";
import user from "@/store/modules/user";
import profile from "@/store/modules/profile";
import search from "@/store/modules/search";

Vue.use(Vuex);

const index = new Vuex.Store({
  modules: {
    environment: environment,
    user: user,
    search: search,
    profile: profile
  }
});

export default index;

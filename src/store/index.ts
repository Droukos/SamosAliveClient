import Vue from "vue";
import Vuex from "vuex";
import environment from "@/store/modules/environment";
import user from "@/store/modules/user";
import profile from "@/store/modules/profile";
import search from "@/store/modules/search";
import aedEvent from "@/store/modules/aedEvent";
import news from "@/store/modules/news";
import aedProblem from "@/store/modules/aedProblem";

Vue.use(Vuex);

const index = new Vuex.Store({
  modules: {
    environment: environment,
    user: user,
    search: search,
    profile: profile,
    aedEvent: aedEvent,
    news: news,
    aedProblem: aedProblem
  }
});

export default index;

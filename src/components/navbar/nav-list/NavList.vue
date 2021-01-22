<template>
  <div>
    <NavMainList v-if="subNavBarOpen === subOptions.MAIN" />
    <NavSubEventsList v-else-if="subNavBarOpen === subOptions.SUB_EVENTS" />
    <NavHealthList v-else-if="subNavBarOpen === subOptions.HEALTH" />
    <NavAdminList v-else-if="subNavBarOpen === subOptions.ADMIN" />
    <NavProblemsList v-else-if="subNavBarOpen === subOptions.PROBLEMS" />
    <NavNewsList v-else-if="subNavBarOpen === subOptions.NEWS" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import subNavBabOptions from "@/plugins/enums/subnavbar-options";

const environment = namespace("environment");

@Component({
  components: {
    NavMainList: () =>
      import(
        /* webpackChunkName: "NavMainList" */ "@/components/navbar/nav-list/NavMainList.vue"
      ),
    NavSubEventsList: () =>
      import(
        /* webpackChunkName: "NavSubEventsList" */ "@/components/navbar/nav-list/NavSubEventsList.vue"
      ),
    NavHealthList: () =>
      import(
        /* webpackChunkName: "NavHealthList" */ "@/components/navbar/nav-list/NavHealthList.vue"
      ),
    NavAdminList: () =>
      import(
        /* webpackChunkName: "NavAdminList" */ "@/components/navbar/nav-list/NavAdminList.vue"
      ),
    NavProblemsList: () =>
      import(
        /* webpackChunkName: "NavProblemsList" */ "@/components/navbar/nav-list/NavProblemsList.vue"
      ),
    NavNewsList: () =>
      import(
        /* webpackChunkName: "NavNewsList" */ "@/components/navbar/nav-list/NavNewsList.vue"
      )
  }
})
export default class NavBarList extends Vue {
  @environment.Getter subNavBarOpen!: number;
  subOptions = subNavBabOptions;
}
</script>
>

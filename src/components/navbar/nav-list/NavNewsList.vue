<template>
  <div>
    <SubNavBackBtn />
    <v-list-item
      v-for="item in showPages"
      :key="item.index"
      @click="to(item.index)"
    >
      <v-list-item-icon>
        <v-icon v-text="item.icon" />
      </v-list-item-icon>
      <v-list-item-title v-text="item.title" />
      <div v-if="item.rArrowIcon">
        <v-spacer />
        <v-icon v-text="'$chevRight'" />
      </div>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { NavDrawElem } from "@/types";
import { roles } from "@/plugins/enums/roles";

const environment = namespace("environment");
const user = namespace("user");

@Component({
  components: {
    SubNavBackBtn: () =>
      import(
        /* webpackChunkName: "SubNavBackBtn" */ "@/components/navbar/nav-utility/SubNavBackBtn.vue"
      )
  }
})
export default class NavProblemsList extends Vue {
  @environment.Getter subNavBavOpen!: number;
  @user.Getter userRolesList!: string[];
  @user.Getter visPages!: (data: {
    navElemArr: NavDrawElem[];
    rolesList: string[];
  }) => NavDrawElem[];

  to(index: number) {
    this.$router.push({
      name: this.newsListOptions[index].link
    });
  }

  get newsListOptions() {
    return [
      {
        index: 0,
        title: this.$t("news.form"),
        icon: "$openNew",
        roleVisibility: [roles.GENERAL_ADMIN, roles.RESCUER, roles.TECHNICIAN],
        link: "newsCreate"
      },
      {
        index: 1,
        title: this.$t("news.search"),
        icon: "$search",
        roleVisibility: [roles.ALL],
        link: "newsSearchCard"
      },
      {
        index: 2,
        title: this.$t("news.content"),
        icon: "$newsLatest",
        roleVisibility: [roles.ALL],
        link: "newsAll"
      }
    ];
  }

  get showPages() {
    return this.visPages({
      navElemArr: this.newsListOptions,
      rolesList: this.userRolesList
    });
  }
}
</script>

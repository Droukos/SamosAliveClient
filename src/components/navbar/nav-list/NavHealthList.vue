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
import { roles } from "@/plugins/enums/roles";
import { NavDrawElem } from "@/types";

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
export default class NavBarHealthList extends Vue {
  @environment.Getter subNavBavOpen!: number;
  @user.Getter userRolesList!: string[];
  @user.Getter visPages!: (data: {
    navElemArr: NavDrawElem[];
    rolesList: string[];
  }) => NavDrawElem[];

  to(index: number) {
    this.$router.push({
      name: this.healthListOptions[index].link
    });
  }

  get healthListOptions() {
    return [
      {
        index: 0,
        title: this.$t("sub-apps-health.device.register"),
        icon: "$openNew",
        roleVisibility: [roles.GENERAL_ADMIN],
        link: "registerAedDevice"
      },
      {
        index: 1,
        title: this.$t("sub-apps-health.emergency.request"),
        icon: "$medicalBag",
        roleVisibility: [roles.ALL],
        link: "createAedEvent"
      },
      {
        index: 2,
        title: this.$t("sub-apps-health.emergency.watch"),
        icon: "$eye",
        roleVisibility: [roles.GENERAL_ADMIN],
        link: ""
      },
      {
        index: 3,
        title: this.$t("sub-apps-health.emergency.live"),
        icon: "$accessPoint",
        roleVisibility: [roles.GENERAL_ADMIN, roles.RESCUER],
        link: ""
      }
    ];
  }

  get showPages() {
    return this.visPages({
      navElemArr: this.healthListOptions,
      rolesList: this.userRolesList
    });
  }
}
</script>

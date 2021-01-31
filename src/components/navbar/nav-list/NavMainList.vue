<template>
  <div>
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
import subNavBabOptions from "@/plugins/enums/subnavbar-options";
import { navOptions } from "@/plugins/enums/nav-options";
import { roles } from "@/plugins/enums/roles";
import { NavDrawElem } from "@/types";

const user = namespace("user");
const environment = namespace("environment");

@Component
export default class NavBarMainList extends Vue {
  @user.Action logoutUser!: () => Promise<void>;
  @user.Getter userRolesList!: string[];
  @user.Getter visPages!: (data: {
    navElemArr: NavDrawElem[];
    rolesList: string[];
  }) => NavDrawElem[];
  @environment.Mutation setSubNavBarOpen!: (index: number) => void;

  to(index: number) {
    if (index == navOptions.SUB_EVENTS) {
      this.setSubNavBarOpen(subNavBabOptions.SUB_EVENTS);
    } else if (index == navOptions.HEALTH) {
      this.setSubNavBarOpen(subNavBabOptions.HEALTH);
    } else if (index == navOptions.REPORTS_ISSUES) {
      this.setSubNavBarOpen(subNavBabOptions.PROBLEMS);
    } else if (index == navOptions.ANNOUNCEMENTS) {
      this.setSubNavBarOpen(subNavBabOptions.NEWS);
    } else if (index == navOptions.ADMINISTRATION) {
      this.setSubNavBarOpen(subNavBabOptions.ADMIN);
    } else if (index == navOptions.LOGOUT) {
      this.logoutUser();
    }
    this.$router.push({
      name: this.pages[index].link
    });
  }

  get pages() {
    return [
      {
        index: navOptions.MAIN,
        link: "aedEvent",
        title: this.$t("mainTitle"),
        icon: "$home",
        roleVisibility: [roles.ALL],
        rArrowIcon: false
      },
      {
        index: navOptions.LIVE_EVENTS,
        link: "eventLive",
        title: this.$t("events.live"),
        icon: "$liveEv",
        roleVisibility: [roles.GENERAL_ADMIN, roles.RESCUER],
        rArrowIcon: false
      },
      {
        index: navOptions.SUB_EVENTS,
        link: "",
        title: this.$t("events.sub"),
        icon: "$subStack",
        roleVisibility: [roles.ALL],
        rArrowIcon: true
      },
      {
        index: navOptions.HEALTH,
        link: "",
        title: this.$t("apps.health"),
        icon: "$hospital",
        roleVisibility: [roles.ALL],
        rArrowIcon: true
      },
      {
        index: navOptions.REPORTS_ISSUES,
        link: "",
        title: this.$t("problems.list"),
        icon: "$problems",
        roleVisibility: [roles.RESCUER, roles.GENERAL_ADMIN, roles.TECHNICIAN],
        rArrowIcon: true
      },
      {
        index: navOptions.ANNOUNCEMENTS,
        link: "",
        title: this.$t("news.title"),
        icon: "$news",
        roleVisibility: [roles.ALL],
        rArrowIcon: true
      },
      {
        index: navOptions.ADMINISTRATION,
        link: "",
        title: this.$t("apps.admin"),
        icon: "$shield",
        roleVisibility: [roles.GENERAL_ADMIN],
        rArrowIcon: true
      },
      {
        index: navOptions.SEARCH,
        link: "search",
        title: this.$t("search.title"),
        icon: "$search",
        roleVisibility: [roles.ALL],
        rArrowIcon: false
      },
      {
        index: navOptions.INFORMATION,
        link: "info",
        title: this.$t("info.title"),
        icon: "$info",
        roleVisibility: [roles.ALL],
        rArrowIcon: false
      },
      {
        index: navOptions.SETTINGS,
        link: "settings",
        title: this.$t("settings.title"),
        icon: "$settings",
        roleVisibility: [roles.ALL],
        rArrowIcon: false
      },
      {
        index: navOptions.LOGOUT,
        link: "login",
        title: this.$t("user.logout"),
        roleVisibility: [roles.ALL],
        icon: "$doorOpen"
      }
    ];
  }

  get showPages() {
    return this.visPages({
      navElemArr: this.pages,
      rolesList: this.userRolesList
    });
  }
}
</script>

<template>
  <div>
    <v-list-item v-for="(item, index) in pages" :key="index" @click="to(index)">
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

const user = namespace("user");
const environment = namespace("environment");

@Component
export default class NavBarMainList extends Vue {
  @user.Action logoutUser!: () => Promise<void>;
  @environment.Mutation setSubNavBarOpen!: (index: number) => void;

  to(index: number) {
    if (index == 3) {
      this.setSubNavBarOpen(subNavBabOptions.NEWS);
    } else if (index == 4) {
      this.setSubNavBarOpen(subNavBabOptions.HEALTH);
    } else if (index == 9) {
      this.logoutUser();
    } else if (index == 5) {
      this.setSubNavBarOpen(subNavBabOptions.ADMIN);
    } else if (index == 11) {
      this.setSubNavBarOpen(subNavBabOptions.PROBLEMS);
    }
    this.$router.push({
      name: this.pages[index].link
    });
  }

  get pages() {
    return [
      {
        index: 0,
        link: "aedEvent",
        title: this.$t("mainTitle"),
        icon: "$home",
        rArrowIcon: false
      },
      {
        index: 1,
        link: "search",
        title: this.$t("search.title"),
        icon: "$search",
        rArrowIcon: false
      },
      {
        index: 2,
        link: "messages",
        title: this.$t("messages.title"),
        icon: "$messages",
        rArrowIcon: false
      },
      {
        index: 3,
        link: "",
        title: this.$t("news.title"),
        icon: "$news",
        rArrowIcon: true
      },
      {
        index: 4,
        link: "",
        title: this.$t("apps.health"),
        icon: "$hospital",
        rArrowIcon: true
      },
      {
        index: 5,
        link: "",
        title: this.$t("apps.admin"),
        icon: "$shield",
        rArrowIcon: true
      },
      {
        index: 6,
        link: "history",
        title: this.$t("history.title"),
        icon: "$history",
        rArrowIcon: false
      },
      {
        index: 7,
        link: "aedMap",
        title: this.$t("info.title"),
        icon: "$info",
        rArrowIcon: false
      },
      {
        index: 8,
        link: "settings",
        title: this.$t("settings.title"),
        icon: "$settings",
        rArrowIcon: false
      },
      {
        index: 9,
        link: "login",
        title: this.$t("user.logout"),
        icon: "$doorOpen"
      },
      {
        index: 10,
        link: "eventLive",
        title: this.$t("events.live"),
        icon: "$liveEv",
        rArrowIcon: false
      },
      {
        index: 11,
        link: "",
        title: this.$t("problems.list"),
        icon: "$history",
        rArrowIcon: true
      }
    ];
  }
}
</script>

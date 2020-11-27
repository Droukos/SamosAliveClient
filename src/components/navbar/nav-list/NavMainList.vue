<template>
  <div>
    <v-list-item v-for="(item, index) in pages" :key="index" @click="to(index)">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
      <div v-if="item.rArrowIcon">
        <v-spacer />
        <v-icon>{{ "$chevRight" }}</v-icon>
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
    if (index == 4) {
      this.setSubNavBarOpen(subNavBabOptions.HEALTH);
    } else if (index == 8) {
      this.logoutUser();
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
        link: "news",
        title: this.$t("news.title"),
        icon: "$news",
        rArrowIcon: false
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
        link: "history",
        title: this.$t("history.title"),
        icon: "$history",
        rArrowIcon: false
      },
      {
        index: 6,
        link: "aedMap",
        title: this.$t("info.title"),
        icon: "$info",
        rArrowIcon: false
      },
      {
        index: 7,
        link: "settings",
        title: this.$t("settings.title"),
        icon: "$settings",
        rArrowIcon: false
      },
      {
        index: 8,
        link: "login",
        title: this.$t("user.logout"),
        icon: "$doorOpen",
        rArrowIcon: false
      }
    ];
  }
}
</script>

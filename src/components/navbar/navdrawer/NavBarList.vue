<template>
  <div>
    <v-list-item v-for="(item, index) in pages" :key="index" @click="to(index)">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const user = namespace("user");

@Component
export default class NavBarList extends Vue {
  @user.Action logoutUser!: () => Promise<void>;

  to(index: number) {
    if (index == 7) {
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
        icon: "$home"
      },
      {
        index: 1,
        link: "search",
        title: this.$t("search.title"),
        icon: "$search"
      },
      {
        index: 2,
        link: "messages",
        title: this.$t("messages.title"),
        icon: "$messages"
      },
      {
        index: 3,
        link: "news",
        title: this.$t("news.title"),
        icon: "$news"
      },
      {
        index: 4,
        link: "history",
        title: this.$t("history.title"),
        icon: "$history"
      },
      {
        index: 5,
        link: "info",
        title: this.$t("info.title"),
        icon: "$info"
      },
      {
        index: 6,
        link: "settings",
        title: this.$t("settings.title"),
        icon: "$settings"
      },
      {
        index: 7,
        link: "login",
        title: this.$t("user.logout"),
        icon: "$doorOpen"
      }
    ];
  }
}
</script>
>

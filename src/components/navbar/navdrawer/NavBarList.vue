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
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
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
        icon: "$vuetify.icons.home"
      },
      {
        index: 1,
        link: "search",
        title: this.$t("search.title"),
        icon: "$vuetify.icons.search"
      },
      {
        index: 2,
        link: "messages",
        title: this.$t("messages.title"),
        icon: "$vuetify.icons.messages"
      },
      {
        index: 3,
        link: "news",
        title: this.$t("news.title"),
        icon: "$vuetify.icons.news"
      },
      {
        index: 4,
        link: "history",
        title: this.$t("history.title"),
        icon: "$vuetify.icons.history"
      },
      {
        index: 5,
        link: "info",
        title: this.$t("info.title"),
        icon: "$vuetify.icons.info"
      },
      {
        index: 6,
        link: "settings",
        title: this.$t("settings.title"),
        icon: "$vuetify.icons.settings"
      },
      {
        index: 7,
        link: "login",
        title: this.$t("user.logout"),
        icon: "$vuetify.icons.doorOpen"
      }
    ];
  }
}
</script>
>

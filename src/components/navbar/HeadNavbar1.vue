<template>
  <v-card class="mx-auto overflow-hidden">
    <v-app-bar app clipped-left color="deep-purple darken-3" dense>
      <div v-if="!displaySide()">
        <v-btn router-link to="/login">
          <v-icon>{{ '$vuetify.icons.back' }}</v-icon>
        </v-btn>
      </div>
      <div v-if="displaySide()">
        <v-avatar size="40" @click.stop="drawer = !drawer">
          <img src="https://randomuser.me/api/portraits/lego/0.jpg" alt="Menu" />
        </v-avatar>
      </div>
      <v-spacer />
      <div v-if="!displaySide()">
        <v-btn router-link to="/info">
          <v-icon>{{ '$vuetify.icons.infos' }}</v-icon>
        </v-btn>
        <v-btn router-link to="/settings">
          <v-icon>{{ '$vuetify.icons.settings' }}</v-icon>
        </v-btn>
      </div>
      <div v-if="displaySide()">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn rounded v-on="on">
              <v-icon>{{ '$$vuetify.icons.account' }}</v-icon>
            </v-btn>
          </template>
          <v-list>
             <v-list-item>
               <v-btn rounded router-link to="/login" v-text="$t('user.logout')" />
             </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn rounded v-on="on">{{ $t("lang") }}</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" @click="selLanguage(index)">
            <v-list-item-title>{{item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <div v-if="displaySide()">
      <v-navigation-drawer v-model="drawer" :src="bg" :fixed="true" temporary relative dark>
        <v-list dense nav class="py-0">
          <v-list-item two-line :class="'px-0'">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/lego/0.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>SamosAlive</v-list-item-title>
              <v-list-item-subtitle>(Username)</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-for="item in getItems" :key="item.index" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toggleTheme()">
            <v-icon>{{isDarkMode? '$vuetify.icons.moon' : '$vuetify.icons.sun'}}</v-icon>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </v-card>
</template>

<script>
import SearchCard from '@components/search/SearchCard.vue';

export default {
  data() {
    return {
      isDarkMode: true,
      drawer: false,
      display: true,
      dialog: false,
      background: true,
      items: [
        {
          index: 0,
          lang: "en",
          label: "English"
        },
        {
          index: 1,
          lang: "el",
          label: "Ελληνικά"
        }
      ]
    };
  },
  template: ["<SearchCard>"],
  components: {
    SearchCard: SearchCard
  },
  methods: {
    selLanguage(index) {
      this.$i18n.locale = this.items[index].lang;
      this.$store.commit("setLocale", {locale: this.items[index].lang});
    },
    toLogin() {
      this.$router.push({
        name: "login"
      });
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.$vuetify.theme.dark = this.isDarkMode;
    },
    displaySide() {
      return this.display;
    }
  },
  created: function() {
    
  },
  computed: {
    getItems() {
      return [
        {
          index: 0,
          link: "/event",
          title: this.$t("mainTitle"),
          icon: "$vuetify.icons.home"
        },
        {
          index: 1,
          link: "/search",
          title: this.$t("search.title"),
          icon: "$vuetify.icons.search"
        },
        {
          index: 2,
          link: "/messages",
          title: this.$t("messages.messageTitle"),
          icon: "$vuetify.icons.messages"
        },
        {
          index: 3,
          link: "/news",
          title: this.$t("newsTitle"),
          icon: "$vuetify.icons.news"
        },
        {
          index: 4,
          link: "/profile",
          title: this.$t("user.profileTitle"),
          icon: "$vuetify.icons.profile"
        },
        {
          index: 5,
          link: "/info",
          title: this.$t("info.infoTitle"),
          icon: "$vuetify.icons.infos"
        },
        {
          index: 6,
          link: "/settings",
          title: this.$t("settings.settingsTitle"),
          icon: "$vuetify.icons.settings"
        }
      ];
    },
    bg() {
      //return this.background
      //  ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      //  : undefined;
    }
  }
};
</script>

<style scoped>

</style>
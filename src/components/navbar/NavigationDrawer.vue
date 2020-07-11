<template>
  <div>
    <v-app-bar app clipped-left color="deep-purple darken-3" dense>
      <v-btn text @click.stop="drawer = !drawer">
        <v-icon size="40">{{ '$vuetify.icons.menu' }}</v-icon>
      </v-btn>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text>
            <v-avatar size="40" v-on="on" aria-label="Account">
              <img :src="avatar" alt="Menu" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn
              rounded
              router-link
              to="/login"
              v-text="$t('user.logout')"
              aria-label="ToLogout"
            />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :fixed="true" temporary relative dark>
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="'px-0'">
          <v-list-item-avatar tile size="50">
            <v-img :src="avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <div @click="goToProfile()" style="cursor: pointer;">
              <v-list-item-title style="font-size:19px;">{{ username }}</v-list-item-title>
              <v-list-item-subtitle style="font-size:17px;" :class="role[0]">{{ role[1] }}</v-list-item-subtitle>
            </div>

            <v-menu offset-x>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  :class="statusClass(availability[0])"
                  height="18"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ availability[1] }}
                  <v-icon>{{ '$vuetify.icons.chevRight' }}</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item-group v-model="availability[0]">
                  <v-list-item v-for="(item, index) in status" :key="index">
                    <v-list-item-title>
                      <v-btn
                        block
                        :class="item.class"
                        @click="changeStatus(item.index)"
                      >{{ item.title }}</v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="(item, index) in getToPages" :key="index" @click="to(index)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    goToProfile() {
      this.$router.push({
        name: "user_profile",
        params: {
          userID: this.userId
        }
      });
    },
    to(index) {
      if (index == 6) {
        this.$store.commit("setUserData", {
          id: "",
          username: "",
          name: "",
          surname: "",
          email: "",
          avatar: "",
          description: "",
          online: "",
          availability: "",
          role: ""
        });
        this.$cookies.remove("accToken");
        this.$cookies.remove("refToken");
      }
      this.$router.push({
        name: this.getToPages[index].link
      });
    },
    statusClass(status) {
      return this.$helper.getUserStatusColorLabel(status);
    },
    changeStatus(index) {
      let vm = this;
      let data = { status: index };
      vm.$store.dispatch("changeStatus", data).then(response => {
        vm.$store.commit("setStatus", data);
      });
    }
  },
  computed: {
    getToPages() {
      return [
        {
          index: 0,
          link: "event",
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
        //{
        //  index: 4,
        //  link: "/profile",
        //  title: this.$t("user.title"),
        //  icon: "$vuetify.icons.profile"
        //},
        {
          index: 4,
          link: "info",
          title: this.$t("info.title"),
          icon: "$vuetify.icons.info"
        },
        {
          index: 5,
          link: "settings",
          title: this.$t("settings.title"),
          icon: "$vuetify.icons.settings"
        },
        {
          index: 6,
          link: "login",
          title: this.$t("user.logout"),
          icon: "$vuetify.icons.doorOpen"
        }
      ];
    },
    avatar() {
      return this.$store.getters.getAvatar;
    },
    userId() {
      return this.$store.getters.getUserID;
    },
    username() {
      return this.$store.getters.getUsername;
    },
    role() {
      return [
        this.$helper.getUserRoleColorLabel(this.$store.getters.getRole),
        this.$t("roles." + this.$store.getters.getRole)
      ];
    },
    availability() {
      return [
        this.$store.getters.getAvailability,
        this.$t("status." + this.$store.getters.getAvailability)
      ];
    },
    status() {
      let status = [];
      for (let i = 0; i < 5; i++) {
        status.push({
          index: i,
          class: this.$helper.getUserStatusColorLabel(i),
          title: this.$t("status." + i)
        });
      }
      return status;
    }
  }
};
</script>
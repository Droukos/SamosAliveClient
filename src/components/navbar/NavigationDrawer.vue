<template>
  <div>
    <v-app-bar app clipped-left color="deep-purple darken-3" dense>
      <v-btn text @click.stop="drawer = !drawer" aria-label="ToNavDrawer">
        <v-icon size="40">{{ '$vuetify.icons.menu' }}</v-icon>
      </v-btn>
      <v-spacer />
      <nav-profile-card></nav-profile-card>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :fixed="true" temporary relative dark>
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="'px-0'">
          <v-list-item-avatar tile size="50">
            <avatar-base :username="username" :avatar="avatar" size="50"></avatar-base>
          </v-list-item-avatar>
          <v-list-item-content>
            <div @click="goToProfile()" style="cursor: pointer;">
              <v-list-item-title style="font-size:19px;">{{ username }}</v-list-item-title>
              <!--<v-list-item-subtitle style="font-size:17px;" :class="role[0]">{{ role[1] }}</v-list-item-subtitle>-->
              <v-menu offset-x :close-on-click="true" :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  v-bind="attrs"
                  v-on="on"
                  aria-label="ToRolesMenu"
                >
                  <v-chip :class="greatestRole.class"> {{ greatestRole.title }} </v-chip> <v-chip class=""><v-icon>{{ '$vuetify.icons.chevDown' }}</v-icon></v-chip>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item-group v-model="availability[0]">
                  <v-list-item v-for="(item, index) in roles" :key="index">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        block
                        v-bind="attrs"
                        v-on="on"
                        :class="item.class"
                        @click="changeStatus(item.index)"
                        aria-label="StatusOption"
                        >{{ item.title }}
                        <v-checkbox class="ml-2" :disabled="isNotLastActiveRole" @click="deactivateRole()" input-value="true" value></v-checkbox>
                        </v-btn>
                        
                      </template>
                      <span>{{ item.tooltip }}</span>
                      
                    </v-tooltip>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-btn block v-if="roleChanged">{{$t("forms.apply")}}</v-btn>
            </v-menu>
            </div>

            <v-menu offset-x :close-on-click="true" :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  :class="statusClass(availability[0])"
                  height="18"
                  v-bind="attrs"
                  v-on="on"
                  aria-label="ToStatusMenu"
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
                        aria-label="StatusOption"
                      >{{ item.title }}</v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-btn block v-if="statusChanged" @click="applyStatus()">{{$t("forms.apply")}}</v-btn>
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
      drawer: false,
      roleChanged: false,
      statusChanged: false,
      dataStatus: ""
    };
  },
  components: {
    NavProfileCard: () =>
      import(
       /* webpackChunkName: "NavProfileCard" */ "@/components/navbar/NavProfileCard"
      ),
     AvatarBase: () =>
      import(
       /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase"
      )
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
        this.removeUserData();
      }
      this.$router.push({
        name: this.getToPages[index].link
      });
    },
    removeUserData(){
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
    },
    statusClass(status) {
      return this.$helper.getUserStatusColorLabel(status);
    },
    rolesClass(role) {
      return this.$helper.getUserRoleColorLabel(role);
    },
    changeStatus(index) {
      this.dataStatus = { status: index };
      this.statusChanged = true;
    },
    applyStatus() {
      let vm = this;
      this.statusChanged = false;
       vm.$store.dispatch("changeStatus", vm.dataStatus).then(response => {
        vm.$store.commit("setStatus", vm.dataStatus);
      });
    },
    deactivateRole(index) {

    },
    applyRoles() {

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
    roles() {
      return this.$store.getters.getRoles.map(role => ({
        index: role.code,
        title: this.$t("roles."+this.$helper.getRoleForLocale(role)),
        class: this.$helper.getUserRoleColorLabel(role),
        tooltip: this.$t("roles.addedBy", [role.addedBy, this.$helper.convDate(role.added, 'long', this.locale)])
        }));
    },
    isNotLastActiveRole() {
      let oneActive = false;
      let isLastActive = true;
      this.$store.getters.getRoles.forEach(role => {
        if(role.active == true && oneActive) return isLastActive = false;
        else if(role.active === true) oneActive = true;
      });
      return isLastActive;
    },
    greatestRole() {
      let greatestRole =  this.$helper.getGreatestRole(this.$store.getters.getRoles)

      return {
         title: this.$t("roles."+this.$helper.getRoleForLocale(greatestRole)),
         class: this.$helper.getUserRoleColorLabel(greatestRole),
      };
    },
    availability() {
      return [
        this.$store.getters.getAvailability,
        this.$t("status." + this.$store.getters.getAvailability)
      ];
    },
    locale: function() {
          return this.$store.getters.getLocale;
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
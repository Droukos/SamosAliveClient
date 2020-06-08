<template>
  <v-content>

    <v-text-field
      v-model="model"
      :loading="isLoading"
      class="pt-1"
      :counter="counter"
      :label="label"
      prepend-icon="mdi-database-search"
      @keyup="search()"
      outlined
    ></v-text-field>

    <v-card>
      <v-tabs center-active show-arrows>
        <v-tab v-for="item in searchItems" :key="item.id" @click="selectTab(item)">{{ item.label }}</v-tab>
      </v-tabs>
    </v-card>
    <v-divider class="pb-1"></v-divider>
    <v-card>
      <v-list three-line>
        <v-list-item v-for="item in items" :key="item.id" @click="goToProfile(item.id)">
          <!--<v-list-item-icon>
            <v-icon v-if="item.icon" color="pink">mdi-star</v-icon>
          </v-list-item-icon>-->
          <v-list-item-avatar>
            <avatar-base
              size="190"
              :username="item.user"
              style="font-size: 25px;color:black;"
            ></avatar-base>
          </v-list-item-avatar>

          <v-list-item-content>
           <v-list-item-title>
             <div class="d-flex flex-row">
                <p class="pr-2" style="font-weight: bold;"> {{ item.user }} </p>
                <p :class="$helper.getUserRoleColorLabel(item.role) + ' pr-2'" style="font-weight: bold;" >{{ $t('roles.'+item.role) }} </p>
                <p :class="$helper.getUserStatusColorLabel(item.status)" style="font-weight: bold;">{{ $t('status.'+item.status) }}</p>
             </div>
           </v-list-item-title>
           <div class="d-flex flex-row"> 
            <p class="grey--text text--darken-1" style="font-size:16px;">{{ item.name }} {{ item.sur }}</p>
           </div>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
    </v-card>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      model: "",
      items: [],
      counter: 30,
      label: ""
    };
  },
  template: ["<AvatarBase>"],
  components: {
    AvatarBase: () =>
      import(
        /* webpackMode: "eager" */ /* webpackChunkName: "AvatarBase" */ /* webpackPreload: true */ "../profile/avatar/AvatarBase.vue"
      )
  },
  methods: {
    selectTab(tab) {
      this.label = tab.searchLabel;
      this.counter = tab.counter;
    },
    goToProfile(userId) {
      this.$router.push({
        name: "user_profile",
        params: {
          userID: userId
        }
      });
    },
    fetchUserPreviewList() {
      clearTimeout(this._timerId);

      this._timerId = setTimeout(() => {
        this.$store.dispatch("search/fetchUsersPreview", {
            user: this.model
          })
          .then(response => {
            console.log(response.data);
            this.items = response.data;

          })
          .finally(() => (this.isLoading = false));
      }, 700);
    },
    search() {
      if (this.model.length < 2) {
        return;
      }

      this.isLoading = true;
      this.fetchUserPreviewList();
    }
  },
  computed: {
    searchItems() {
      return [
        {
          id: 0,
          title: this.$t("search.searchObj", [this.$t("fields.profile")]),
          counter: 20,
          label: this.$t("fields.profile"),
          searchLabel: `${this.$t("search.title")} ${this.$t(
            "fields.username"
          )}`
        },
        {
          id: 1,
          title: this.$t("search.searchObj", [this.$t("fields.device")]),
          counter: 20,
          label: this.$t("fields.device"),
          searchLabel: `${this.$t("search.title")} ${this.$t("fields.device")}`
        },
        {
          id: 2,
          title: this.$t("search.searchObj", [this.$t("news.title")]),
          counter: 50,
          label: this.$t("news.title"),
          searchLabel: `${this.$t("search.title")} ${this.$t("news.newsTitle")}`
        }
      ];
    }
  }
};
</script>

<style>
</style>
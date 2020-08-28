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
        <v-tab
          v-for="item in searchItems"
          :key="item.id"
          @click="selectTab(item)"
          >{{ item.label }}</v-tab
        >
      </v-tabs>
    </v-card>
    <v-divider class="pb-1"></v-divider>
    <v-card>
      <v-list three-line>
        <v-list-item
          v-for="item in items"
          :key="item.id"
          @click="goToProfile(item.id)"
        >
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
                <p class="pr-2" style="font-weight: bold;">{{ item.user }}</p>
                <v-chip
                  v-for="role in item.roles"
                  :key="role"
                  label
                  x-small
                  :class="$helper.getUserRoleColorLabel(role) + ' mr-1'"
                  style="font-weight: bold"
                >
                  {{ $t("roles." + role) }}
                </v-chip>
                <p
                  :class="$helper.getUserStatusColorLabel(item.status)"
                  style="font-weight: bold;"
                >
                  {{ $t("status." + item.status) }}
                </p>
              </div>
            </v-list-item-title>
            <div class="d-flex flex-row">
              <p class="grey--text text--darken-1" style="font-size:16px;">
                {{ item.name }} {{ item.sur }}
              </p>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Tab } from "@/types";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component({
  components: {
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ /* webpackPreload: true */ "@/components/profile/avatar/AvatarBase.vue"
      )
  }
})
export default class SearchCard extends Vue {
  isLoading = false;
  model = "";
  items = [];
  counter = 30;
  label = "";
  @search.Action fetchUsersPreview!: (user: string) => Promise<>;

  selectTab(tab: Tab) {
    this.label = tab.searchLabel;
    this.counter = tab.counter;
  }
  goToProfile(userId: string) {
    this.$router.push({
      name: "user_profile",
      params: {
        userID: userId
      }
    });
  }
  fetchUserPreviewList() {
    setTimeout(() => {
      this.fetchUsersPreview(this.model)
        .then(response => {
          console.log(response.data);
          this.items = response.data;
        })
        .finally(() => (this.isLoading = false));
    }, 700);
  }
  search() {
    if (this.model.length < 2) {
      return;
    }

    this.isLoading = true;
    this.fetchUserPreviewList();
  }

  get searchItems() {
    return [
      {
        id: 0,
        title: this.$t("search.searchObj", [this.$t("fields.profile")]),
        counter: 20,
        label: this.$t("fields.profile"),
        searchLabel: `${this.$t("search.title")} ${this.$t("fields.username")}`
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
</script>

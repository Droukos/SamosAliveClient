<template>
  <v-content>
    <p class="display-1" style="color:#00897B">
      {{ $t("privacy.title") }}{{ privacyForm.username }}
    </p>
    <v-card outlined>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="privySet in privacyForm.userPrivacy"
          :key="privySet.index"
        >
          <v-expansion-panel-header>{{
            $t(privySet.i18n)
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
              v-model="privySet.type"
              :items="privacyTypes"
              :disabled="false"
              :readonly="false"
              chips
              item-text="preview"
              item-value="type"
              :label="$t('privacy.showType')"
            >
            </v-select>

            <v-autocomplete
              v-if="isNotPublicOrPrivate(privySet.type)"
              v-model="privySet.list"
              :items="users"
              :loading="isLoading"
              :search-input.sync="search"
              color="white"
              hide-no-data
              hide-selected
              item-text="Description"
              item-value="API"
              :label="$t('user.usersAutocomplete')"
              :placeholder="$t('user.usersSearch')"
              prepend-icon="mdi-database-search"
              return-object
            ></v-autocomplete>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { countries } from "@/plugins/helpers/countries";
import { Country } from "@/types";

@Component
export default class PrivacySettingsCard extends Vue {
  privacyForm = {
    userID: "1",
    username: "Axilleas",
    userPrivacy: [
      {
        index: 1,
        name: "show_online_status",
        i18n: "privacy.onlineStatus",
        type: "",
        list: ""
      },
      {
        index: 2,
        name: "show_last_login",
        i18n: "privacy.lastLogin",
        type: "",
        list: ""
      },
      {
        index: 3,
        name: "show_last_logout",
        i18n: "privacy.lastLogout",
        type: "",
        list: ""
      },
      {
        index: 4,
        name: "show_fullname",
        i18n: "privacy.fullName",
        type: "",
        list: ""
      },
      {
        index: 5,
        name: "show_email",
        i18n: "privacy.email",
        type: "",
        list: ""
      },
      {
        index: 6,
        name: "show_account_created",
        i18n: "privacy.accountCreated",
        type: "",
        list: ""
      },
      {
        index: 7,
        name: "show_description",
        i18n: "privacy.description",
        type: "",
        list: ""
      },
      {
        index: 8,
        name: "show_address",
        i18n: "privacy.address",
        type: "",
        list: ""
      },
      {
        index: 9,
        name: "show_phone",
        i18n: "privacy.phone",
        type: "",
        list: ""
      }
    ]
  };
  isLoading = false;
  users = [];
  search: Country[] = [];

  isNotPublicOrPrivate(type: string) {
    console.log(type);
    return type !== "public" && type !== "private";
  }
  querySelections(v: string) {
    this.isLoading = true;
    // Simulated ajax query
    setTimeout(() => {
      const queryCountries = countries.filter((c: Country) => {
        return (
          (c.name || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
        );
      });
      console.log(queryCountries);
      this.isLoading = false;
      this.search = queryCountries;
    }, 800);
  }

  @Watch("search")
  searchChanged(val: string) {
    //val && val !== this.users && this.querySelections(val);
    val && this.querySelections(val);
  }

  get privacyTypes() {
    return [
      {
        preview: this.$t("privacy.public"),
        type: "public"
      },
      {
        preview: this.$t("privacy.private"),
        type: "private"
      },
      {
        preview: this.$t("privacy.onlyTo"),
        type: "onlyto"
      },
      {
        preview: this.$t("privacy.exceptTo"),
        type: "exceptto"
      }
    ];
  }
}
</script>

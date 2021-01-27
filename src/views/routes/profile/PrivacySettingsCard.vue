<template>
  <v-main>
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      :loading="loadingSkeleton"
      transition="scale-transition"
      type="card"
    >
      <v-container>
        <p
          class="display-1"
          style="color:#00897B"
          v-text="$t('privacy.title') + ' ' + username"
        />
        <v-card outlined>
          <v-expansion-panels>
            <v-expansion-panel
              v-for="privySet in privacyForm.userPrivacy"
              :key="privySet.index"
            >
              <v-expansion-panel-header v-text="$t(privySet.i18n)" />
              <v-expansion-panel-content>
                <v-select
                  v-model="privySet.type"
                  :items="privacyTypes"
                  :disabled="false"
                  :readonly="false"
                  chips
                  @change="activateUpdateBtn"
                  item-text="preview"
                  item-value="type"
                  :label="$t('privacy.showType')"
                />

                <v-autocomplete
                  v-if="isNotPublicOrPrivate(privySet.type)"
                  v-model="privySet.users"
                  :items="searchedUsers"
                  :loading="isLoading"
                  :search-input.sync="search"
                  clearable
                  deletable-chips
                  counter
                  color="white"
                  hide-no-data
                  hide-selected
                  small-chips
                  multiple
                  :label="$t('user.usersAutocomplete')"
                  :placeholder="$t('user.usersSearch')"
                  prepend-icon="$database"
                  return-object
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-btn
            v-if="updateVisible"
            class="deep-purple darken-2"
            style="color:white;"
            block
            rounded
            @click="updatePrivacyInfo()"
            aria-label="PrivacyUpdate"
            v-text="$t('edit.update')"
          />
          <span
            v-if="updateResultShow"
            :class="updateResultClass + 'mx-auto'"
            v-text="updateResultMessage"
          />
        </v-card>
      </v-container>
    </v-skeleton-loader>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import privacyProfileMod from "@/store/modules/dynamic/profile/profile-privacy";
import { PrivacyForm, UserIdDto, UsernameDto, UserPrivacySets } from "@/types";

const user = namespace("user");
const privacy = namespace("privacyProfile");

@Component({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const privacyProfileCard = vm as PrivacySettingsCard;
      const store = privacyProfileCard.$store;
      if (!(store && store.state && store.state["privacyProfile"])) {
        store.registerModule("privacyProfile", privacyProfileMod);
      }
      privacyProfileCard
        .fetchPrivacySets({
          userid: to.params.userID
        })
        .then(() => (privacyProfileCard.loadingSkeleton = false));
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("privacyProfile");
  }
})
export default class PrivacySettingsCard extends Vue {
  @user.Getter userUserId!: string;
  @privacy.State username!: string;
  @privacy.Getter privacyUserId!: string;
  @privacy.State updateVisible!: boolean;
  @privacy.State updateResultShow!: boolean;
  @privacy.State updateResultMessage!: string;
  @privacy.State updateResultClass!: string;
  @privacy.Action fetchUsernameOnly!: (
    usernameDto: UsernameDto
  ) => Promise<string[]>;
  @privacy.Action fetchPrivacySets!: (
    data: UserIdDto
  ) => Promise<UserPrivacySets>;
  @privacy.Action putPrivacySets!: () => Promise<string>;
  @privacy.State privacyForm!: PrivacyForm;
  @privacy.Mutation setSuccessUpdate!: () => void;
  @privacy.Mutation setFailedUpdate!: () => void;
  @privacy.Mutation activateUpdateBtn!: () => void;
  @privacy.State searchedUsers!: string[];
  loadingSkeleton = true;
  isLoading = false;
  search = "";

  isNotPublicOrPrivate(type: number) {
    return type !== 0 && type !== 3;
  }

  queryUsers(username: string) {
    this.isLoading = true;
    setTimeout(() => {
      this.fetchUsernameOnly({ username: username }).then(
        () => (this.isLoading = false)
      );
    }, 800);
  }

  showUpdatePrivacyBtn() {
    this.activateUpdateBtn();
  }

  updatePrivacyInfo() {
    this.putPrivacySets()
      .then(() => this.setSuccessUpdate())
      .catch(() => this.setFailedUpdate());
  }

  @Watch("search")
  searchChange(username: string) {
    if (username == null || username.length <= 2) return;
    this.queryUsers(username);
  }

  get privacyTypes() {
    return [
      {
        preview: this.$t("privacy.public"),
        type: 0
      },
      {
        preview: this.$t("privacy.private"),
        type: 3
      },
      {
        preview: this.$t("privacy.onlyTo"),
        type: 1
      },
      {
        preview: this.$t("privacy.exceptTo"),
        type: 2
      }
    ];
  }
}
</script>

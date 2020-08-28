<template>
  <v-list-item color="rgba(0, 0, 0, .4)">
    <v-list-item-content>
      <RoleDataBase :showRole="showRole"></RoleDataBase>
      <v-list-item-subtitle v-if="showLastLogin" style="color:#9575CD"
        >{{ $t("user.last_login")
        }}<span style="color:#B39DDB">
          1 Day ago, 15 hours</span
        ></v-list-item-subtitle
      >
      <v-list-item-subtitle v-if="showLastLogout" style="color:#9575CD"
        >{{ $t("user.last_logout")
        }}<span style="color:#B39DDB">
          2 Days ago, 20 hours</span
        ></v-list-item-subtitle
      >
      <v-list-item-subtitle v-if="showOnlineFor" style="color:#9575CD"
        >{{ $t("user.online_for")
        }}<span style="color:#B39DDB">
          3 Days, 20 hours</span
        ></v-list-item-subtitle
      >
      <v-list-item-subtitle v-if="showOfflineFor" style="color:#9575CD"
        >{{ $t("user.offline_for")
        }}<span style="color:#B39DDB">
          300 Years, 6 Days, 20 hours</span
        ></v-list-item-subtitle
      >
      <v-list-item-subtitle v-if="showUserCreated" style="color:#9575CD">{{
        $t("user.account_created") +
          " " +
          $helper.convDate(user_created, "long", this.locale)
      }}</v-list-item-subtitle>
      <v-list-item-subtitle v-if="showUserUpdated" style="color:#9575CD">{{
        $t("user.account_updated")
      }}</v-list-item-subtitle>
      <v-list-item-subtitle v-if="showCredibilityStars" style="color:#9575CD"
        >{{ $t("user.cred_stars") }} {{ cred_stars.rating + "/5" }}
        <v-rating
          v-model="cred_stars.rating"
          :length="cred_stars.length"
          :empty-icon="cred_stars.emptyIcon"
          :full-icon="cred_stars.fullIcon"
          :half-icon="cred_stars.halfIcon"
          half-increments
          :hover="cred_stars.hover"
          :readonly="cred_stars.readonly"
          :size="cred_stars.size"
          :dense="true"
        ></v-rating>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { CreditsStat } from "@/types";
const profile = namespace("profile");

@Component({
  components: {
    RoleDataBase: () =>
      import(
        /* webpackChunkName: "RoleDataBase" */ /* webpackPreload: true */ "@/components/profile/profile_info/RoleDataBase.vue"
      )
  }
})
export default class MetaDataBase extends Vue {
  @Prop() public showRole!: boolean;
  @profile.State public cred_stars!: CreditsStat;
  @profile.State public user_created!: number[] | undefined;

  @profile.State public showLastLogin!: boolean;
  @profile.State public showLastLogout!: boolean;
  @profile.State public showOnlineFor!: boolean;
  @profile.State public showOfflineFor!: boolean;
  @profile.State public showUserCreated!: boolean;
  @profile.State public showUserUpdated!: boolean;
  @profile.State public showCredibilityStars!: boolean;

  @profile.State
  public locale!: string;
}
</script>

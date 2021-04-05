<template>
  <v-list-item color="rgba(0, 0, 0, .4)">
    <v-list-item-content>
      <RoleDataBase :showRole="showRole" />
      <!--<v-list-item-subtitle v-if="showLastLogin" style="color:#9575CD"
        >{{ $t("user.lastLogin")
        }}<span style="color:#B39DDB">
          1 Day ago, 15 hours</span
        ></v-list-item-subtitle
      >
      <v-list-item-subtitle v-if="showLastLogout" style="color:#9575CD"
        >{{ $t("user.lastLogout")
        }}<span style="color:#B39DDB">
          2 Days ago, 20 hours</span
        ></v-list-item-subtitle
      >-->
      <v-list-item-subtitle
        :style="isOnline ? 'color:#18FFFF' : 'color:#455A64'"
        v-text="isOnline ? $t('user.online') : $t('user.offline')"
      />
      <v-list-item-subtitle
        v-if="isOnline && showLLogWeb"
        style="color:#9575CD"
        v-text="$t('user.onlineFor') + ' ' + getDuration(lastLoginWeb)"
      />
      <v-list-item-subtitle
        v-if="!isOnline && showLLogWeb"
        style="color:#9575CD"
        v-text="$t('user.offlineFor') + ' ' + getDuration(lastLogoutWeb)"
      />
      <!--<v-list-item-subtitle v-if="showOnlineFor" style="color:#9575CD"
        >{{ $t("user.onlineFor")
        }}<span style="color:#B39DDB">
          3 Days, 20 hours</span
        ></v-list-item-subtitle
      >-->
      <!--<v-list-item-subtitle v-if="showOfflineFor" style="color:#9575CD"
        >{{ $t("user.offlineFor")
        }}<span style="color:#B39DDB">
          300 Years, 6 Days, 20 hours</span
        ></v-list-item-subtitle
      >-->
      <v-list-item-subtitle
        v-if="showUserCreated"
        style="color:#9575CD"
        v-text="
          $t('user.accountCreated') +
            ' ' +
            $helper.convDate2(userCreated, 'long', this.locale)
        "
      />
      <!--<v-list-item-subtitle
        v-if="showUserUpdated"
        style="color:#9575CD"
        v-text="$t('user.account_updated')"
      />-->
      <!--<v-list-item-subtitle v-if="showCredibilityStars" style="color:#9575CD"
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
        />
      </v-list-item-subtitle>-->
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
//import { CreditsStat } from "@/types";
import { getDurationTillNow } from "@/plugins/helpers/helper";

const profile = namespace("profile");
const environment = namespace("environment");

@Component({
  components: {
    RoleDataBase: () =>
      import(
        /* webpackChunkName: "RoleDataBase" */ "@/components/profile/profile-info/RoleDataBase.vue"
      )
  }
})
export default class MetaDataBase extends Vue {
  @Prop() showRole!: boolean;
  //@profile.State cred_stars!: CreditsStat;
  @profile.State isOnline!: boolean;
  @profile.State userCreated!: string | undefined;
  @profile.State lastLoginWeb!: string;
  @profile.State lastLogoutWeb!: string;
  @profile.State showLastLogin!: boolean;
  @profile.State showLastLogout!: boolean;
  @profile.State showOnlineFor!: boolean;
  @profile.State showLLogWeb!: boolean;
  @profile.State showOfflineFor!: boolean;
  @profile.State showUserCreated!: boolean;
  @profile.State showUserUpdated!: boolean;
  @profile.State showCredibilityStars!: boolean;
  @environment.State locale!: string;

  getDuration(date: string) {
    return getDurationTillNow(date);
  }
}
</script>

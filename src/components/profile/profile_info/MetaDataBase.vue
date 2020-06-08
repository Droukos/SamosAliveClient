<template>
  <v-list-item color="rgba(0, 0, 0, .4)">
      <v-list-item-content>
       <role-data-base :showRole="showRole" :profDat="profDat" :profVis="profVis"></role-data-base>
          <v-list-item-subtitle v-if="profVis.showLastLogin" style="color:#9575CD">{{ $t('user.last_login') }}<span style="color:#B39DDB"> 1 Day ago, 15 hours</span></v-list-item-subtitle>
          <v-list-item-subtitle v-if="profVis.showLastLogout" style="color:#9575CD">{{ $t('user.last_logout') }}<span style="color:#B39DDB"> 2 Days ago, 20 hours</span></v-list-item-subtitle>
          <v-list-item-subtitle v-if="profVis.showOnlineFor" style="color:#9575CD">{{ $t('user.online_for') }}<span style="color:#B39DDB"> 3 Days, 20 hours</span></v-list-item-subtitle>
          <v-list-item-subtitle v-if="profVis.showOfflineFor" style="color:#9575CD">{{ $t('user.offline_for') }}<span style="color:#B39DDB"> 300 Years, 6 Days, 20 hours</span></v-list-item-subtitle>
          <v-list-item-subtitle v-if="profVis.showUserCreated" style="color:#9575CD">{{ $t('user.account_created') + " "+$dateUtils.convDate(profMetaDat.user_created, 'long', this.locale) }}</v-list-item-subtitle>
          <v-list-item-subtitle v-if="profVis.showUserUpdated" style="color:#9575CD">{{ $t('user.account_updated') }}</v-list-item-subtitle>
          <v-list-item-subtitle v-if="profVis.showCredibilityStars" style="color:#9575CD">{{ $t('user.cred_stars') }} {{ profMetaDat.cred_stars.rating+"/5" }}
            <v-rating
              v-model="profMetaDat.cred_stars.rating"
              :length="profMetaDat.cred_stars.length"
              :empty-icon="profMetaDat.cred_stars.emptyIcon"
              :full-icon="profMetaDat.cred_stars.fullIcon"
              :half-icon="profMetaDat.cred_stars.halfIcon"
              half-increments
              :hover="profMetaDat.cred_stars.hover"
              :readonly="profMetaDat.cred_stars.readonly"
              :size="profMetaDat.cred_stars.size"
              :dense="true"
            ></v-rating>
          </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    props: ['showRole', 'profDat', 'profMetaDat', 'profVis'],
    components: {
        RoleDataBase: () =>
            import(
              /* webpackMode: "eager" */ /* webpackChunkName: "RoleDataBase" */ /* webpackPreload: true */ "./RoleDataBase.vue"
            ),
    },
    computed: {
        locale: function() {
          return this.$store.getters.getLocale;
        },
    }
}
</script>
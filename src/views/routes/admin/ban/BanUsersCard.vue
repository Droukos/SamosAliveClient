<template>
  <VContent>
    <VContainer>
      <VCard>
        <h3 class="mx-auto" v-text="$t('admin.banS')" />
        <br />
        <AdminSearchAutocomplete :adminOption="adminOption" />
      </VCard>
      <br />
      <AdminBanList />
    </VContainer>
  </VContent>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import adminMixinMod from "@/store/modules/dynamic/admin/admin-mixin";
import { adminOptions } from "@/plugins/enums/admin-options";

@Component({
  components: {
    AdminSearchAutocomplete: () =>
      import(
        /* webpackChunkName: "AdminSearchAutocomplete" */ "@/components/admin/AdminSearchAutocomplete.vue"
      ),
    AdminBanList: () =>
      import(
        /* webpackChunkName: "AdminBanList" */ "@/components/admin/ban/AdminBanList.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const channelCard = vm as BanUsersCard;
      const store = channelCard.$store;
      if (!(store && store.state && store.state["adminMixin"])) {
        store.registerModule("adminMixin", adminMixinMod);
      }
    });
  },
  beforeDestroy() {
    //if (!this.hasAedEvChannel(this.aedEventId)) {
    //  this.deleteEvOnMap(this.aedEventId);
    //}
  }
})
export default class BanUsersCard extends Vue {
  adminOption = adminOptions.BAN_USERS;
}
</script>

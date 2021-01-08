<template>
  <VContent>
    <VContainer>
      <VCard>
        <h3 class="mx-auto" v-text="$t('admin.unbanS')" />
        <br />
        <AdminSearchAutocomplete :adminOption="adminOption" />
      </VCard>
      <br />
      <AdminUnbanList />
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
    AdminUnbanList: () =>
      import(
        /* webpackChunkName: "AdminUnbanList" */ "@/components/admin/unban/AdminUnbanList.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const channelCard = vm as UnbanUsersCard;
      const store = channelCard.$store;
      if (!(store && store.state && store.state["adminMixin"])) {
        store.registerModule("adminMixin", adminMixinMod);
      }
    });
  }
})
export default class UnbanUsersCard extends Vue {
  adminOption = adminOptions.UNBAN_USERS;
}
</script>

<template>
  <VMain>
    <VContainer>
      <VCard>
        <h3 class="mx-auto" v-text="$t('admin.chaRolesS')" />
        <br />
        <AdminSearchAutocomplete :adminOption="adminOption" />
      </VCard>
      <br />
      <AdminChangeRoleList />
    </VContainer>
  </VMain>
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
    AdminChangeRoleList: () =>
      import(
        /* webpackChunkName: "AdminChangeRoleList" */ "@/components/admin/roles/change/AdminChangeRoleList.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const channelCard = vm as RolesChangeCard;
      const store = channelCard.$store;
      if (!(store && store.state && store.state["adminMixin"])) {
        store.registerModule("adminMixin", adminMixinMod);
      }
    });
  }
})
export default class RolesChangeCard extends Vue {
  adminOption = adminOptions.CHANGE_ROLES;
}
</script>

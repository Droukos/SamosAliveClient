<template>
  <VMain>
    <VContainer>
      <VCard>
        <h3 class="mx-auto" v-text="$t('admin.addRolesS')" />
        <br />
        <AdminSearchAutocomplete :adminOption="adminOption" />
      </VCard>
      <br />
      <AdminAddRoleList />
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
    AdminAddRoleList: () =>
      import(
        /* webpackChunkName: "AdminAddRoleList" */ "@/components/admin/roles/add/AdminAddRoleList.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const channelCard = vm as RolesAddCard;
      const store = channelCard.$store;
      if (!(store && store.state && store.state["adminMixin"])) {
        store.registerModule("adminMixin", adminMixinMod);
      }
    });
  }
})
export default class RolesAddCard extends Vue {
  adminOption = adminOptions.ADD_ROLES;
}
</script>

<template>
  <VContent>
    <VContainer>
      <VCard>
        <h3 class="mx-auto" v-text="$t('admin.delRolesS')" />
        <br />
        <AdminSearchAutocomplete :adminOption="adminOption" />
      </VCard>
      <br />
      <AdminDelRoleList />
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
    AdminDelRoleList: () =>
      import(
        /* webpackChunkName: "AdminDelRoleList" */ "@/components/admin/roles/change/AdminDelRoleList.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const channelCard = vm as RolesDelCard;
      const store = channelCard.$store;
      if (!(store && store.state && store.state["adminMixin"])) {
        store.registerModule("adminMixin", adminMixinMod);
      }
    });
  }
})
export default class RolesDelCard extends Vue {
  adminOption = adminOptions.DEL_ROLES;
}
</script>

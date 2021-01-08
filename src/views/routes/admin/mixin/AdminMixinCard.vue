<template>
  <VContent>
    <VContainer>
      <VCard>
        <h3 class="mx-auto" v-text="$t('admin.mixin')" />
        <br />
        <AdminSearchAutocomplete :adminOption="adminOption" />
      </VCard>
      <br />
      <AdminMixinList />
      <AdminBanList v-if="banHasElems" class="mt-2" />
      <AdminUnbanList v-if="unbanHasElems" class="mt-2" />
      <AdminChangeRoleList v-if="chRoleHasElems" class="mt-2" />
      <AdminAddRoleList v-if="addRoleHasElems" class="mt-2" />
      <AdminDelRoleList v-if="delRoleHasElems" class="mt-2" />
    </VContainer>
  </VContent>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import adminMixinMod from "@/store/modules/dynamic/admin/admin-mixin";
import { adminOptions } from "@/plugins/enums/admin-options";
import AdminDelRoleList from "@/components/admin/roles/change/AdminDelRoleList.vue";
import { PreviewUser } from "@/types";
import {
  BanPreviewUser,
  ChangeRolePreviewUser,
  UpdatePreviewUser
} from "@/types/admin";
import { namespace } from "vuex-class";

const adminMixin = namespace("adminMixin");

@Component({
  components: {
    AdminDelRoleList,
    AdminSearchAutocomplete: () =>
      import(
        /* webpackChunkName: "AdminSearchAutocomplete" */ "@/components/admin/AdminSearchAutocomplete.vue"
      ),
    AdminMixinList: () =>
      import(
        /* webpackChunkName: "AdminMixinList" */ "@/components/admin/mixin/AdminMixinList.vue"
      ),
    AdminBanList: () =>
      import(
        /* webpackChunkName: "AdminBanList" */ "@/components/admin/ban/AdminBanList.vue"
      ),
    AdminUnbanList: () =>
      import(
        /* webpackChunkName: "AdminUnbanList" */ "@/components/admin/unban/AdminUnbanList.vue"
      ),
    AdminChangeRoleList: () =>
      import(
        /* webpackChunkName: "AdminChangeRoleList" */ "@/components/admin/roles/change/AdminChangeRoleList.vue"
      ),
    AdminAddRoleList: () =>
      import(
        /* webpackChunkName: "AdminAddRoleList" */ "@/components/admin/roles/add/AdminAddRoleList.vue"
      ),
    AdminDelRoleAction: () =>
      import(
        /* webpackChunkName: "AdminDelRoleAction" */ "@/components/admin/roles/del/AdminDelRoleAction.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const channelCard = vm as AdminMixinCard;
      const store = channelCard.$store;
      if (!(store && store.state && store.state["adminMixin"])) {
        store.registerModule("adminMixin", adminMixinMod);
      }
    });
  }
})
export default class AdminMixinCard extends Vue {
  adminOption = adminOptions.MIXIN;
  @adminMixin.State prUsersToBan!: BanPreviewUser[];
  @adminMixin.State prUsersToUnban!: PreviewUser[];
  @adminMixin.State prUsersToChangeRole!: ChangeRolePreviewUser[];
  @adminMixin.State prUsersToAddRole!: UpdatePreviewUser[];
  @adminMixin.State prUsersToDelRole!: UpdatePreviewUser[];

  get banHasElems() {
    return this.prUsersToBan.length > 0;
  }
  get unbanHasElems() {
    return this.prUsersToUnban.length > 0;
  }

  get chRoleHasElems() {
    return this.prUsersToChangeRole.length > 0;
  }

  get addRoleHasElems() {
    return this.prUsersToAddRole.length > 0;
  }

  get delRoleHasElems() {
    return this.prUsersToDelRole.length > 0;
  }
}
</script>

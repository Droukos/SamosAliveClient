<template>
  <div>
    <VSelect
      v-model="oldRole"
      :label="$t('admin.oldRole')"
      :items="changeRolePreviewUser.previewUser.roles"
      :error="changeRolePreviewUser.oldRoleError"
      style="width: 140px"
    />
    <VAutocomplete
      v-model="newRole"
      :label="$t('admin.newRole')"
      :items="allAvailableRolesForUser(changeRolePreviewUser.previewUser.roles)"
      :error="changeRolePreviewUser.newRoleError"
      style="width: 140px"
    >
    </VAutocomplete>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ChangeRolePreviewUser, ReplacePrUser } from "@/types/admin";
import { namespace } from "vuex-class";
import { adminOptions } from "@/plugins/enums/admin-options";

const adminMixin = namespace("adminMixin");

@Component
export default class AdminChRoleAction extends Vue {
  @Prop() changeRolePreviewUser!: ChangeRolePreviewUser;
  @Prop() index!: number;
  @Prop() allRoles!: string[];
  @adminMixin.Mutation replacePrUserToAdminList!: (data: ReplacePrUser) => void;
  oldRole = "";
  newRole = "";

  @Watch("oldRole")
  oldRoleCh(newVal: string) {
    const errorBool = newVal === this.newRole;

    this.replacePrUserToAdminList({
      prUser: this.changeRolePreviewUser.previewUser,
      adminOption: adminOptions.CHANGE_ROLES,
      index: this.index,
      chRoleOldRoleError: errorBool,
      chRoleNewRoleError: this.changeRolePreviewUser.newRoleError,
      oldRole: newVal,
      newRole: this.newRole
    });
  }

  @Watch("newRole")
  newRoleCh(newVal: string) {
    let errorBool = newVal === this.oldRole;
    errorBool = errorBool || this.newRoleExistInAllRoles();

    this.replacePrUserToAdminList({
      prUser: this.changeRolePreviewUser.previewUser,
      adminOption: adminOptions.CHANGE_ROLES,
      index: this.index,
      chRoleOldRoleError: this.changeRolePreviewUser.oldRoleError,
      chRoleNewRoleError: errorBool,
      oldRole: this.oldRole,
      newRole: newVal
    });
  }

  newRoleExistInAllRoles() {
    return this.allRoles.find(role => role === this.newRole) == undefined;
  }

  allAvailableRolesForUser(userRoles: string[]) {
    return this.allRoles.filter(
      role => userRoles.find(userRole => userRole === role) == undefined
    );
  }
}
</script>

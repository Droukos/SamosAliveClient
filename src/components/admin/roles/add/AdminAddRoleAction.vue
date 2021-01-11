<template>
  <VAutocomplete
    v-model="addRole"
    :label="$t('admin.newRole')"
    outlined
    :items="allAvailableRolesForUser(previewUser.roles)"
    style="width: 140px;"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PreviewUser } from "@/types";
import { namespace } from "vuex-class";
import { ReplacePrUser } from "@/types/admin";
import { adminOptions } from "@/plugins/enums/admin-options";

const adminMixin = namespace("adminMixin");

@Component
export default class AdminAddRoleAction extends Vue {
  @Prop() previewUser!: PreviewUser;
  @Prop() index!: number;
  @Prop() allRoles!: string[];
  @adminMixin.Mutation replacePrUserToAdminList!: (data: ReplacePrUser) => void;
  addRole = "";

  @Watch("addRole")
  addRoleChange(newVal: string) {
    this.replacePrUserToAdminList({
      prUser: this.previewUser,
      index: this.index,
      adminOption: adminOptions.ADD_ROLES,
      updateRole: newVal
    });
  }

  allAvailableRolesForUser(userRoles: string[]) {
    return this.allRoles.filter(
      role => userRoles.find(userRole => userRole === role) == undefined
    );
  }
}
</script>

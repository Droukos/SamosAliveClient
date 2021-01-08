<template>
  <VSelect
    v-model="delRole"
    :label="$t('admin.oldRole')"
    outlined
    :items="previewUser.roles"
    style="width: 140px;"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PreviewUser } from "@/types";
import { ReplacePrUser } from "@/types/admin";
import { namespace } from "vuex-class";
import { adminOptions } from "@/plugins/enums/admin-options";

const adminMixin = namespace("adminMixin");

@Component
export default class AdminDelRoleAction extends Vue {
  @Prop() previewUser!: PreviewUser;
  @Prop() index!: number;
  @adminMixin.Mutation replacePrUserToAdminList!: (data: ReplacePrUser) => void;
  delRole = "";

  @Watch("delRole")
  delRoleChange(newVal: string) {
    this.replacePrUserToAdminList({
      prUser: this.previewUser,
      index: this.index,
      adminOption: adminOptions.DEL_ROLES,
      updateRole: newVal
    });
  }
}
</script>

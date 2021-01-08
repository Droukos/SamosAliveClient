<template>
  <VList rounded :style="borderColor">
    <h2 v-text="$t('admin.chRoleList')" />
    <VDivider />
    <div
      v-if="
        changeRoleProcStat === procOptions.BUILD ||
          prUsersToChangeRole.length > 0
      "
    >
      <VListItem
        class="flex-wrap"
        v-for="(data, i) in prUsersToChangeRole"
        :key="data.previewUser.id"
      >
        <AdminVListAvatar :prUser="data.previewUser" />
        <AdminVListContent :prUser="data.previewUser" />
        <VListItemAction>
          <VBtn @click="removeUser(i)">
            <VIcon v-text="'$close'" />
          </VBtn>
          <AdminChRoleAction
            :changeRolePreviewUser="data"
            :index="i"
            :allRoles="allRoles"
          />
        </VListItemAction>

        <div style="width: 100%; height: 0;" aria-hidden="true" />

        <VDivider inset />
      </VListItem>
      <div class="d-flex flex-row">
        <VSpacer />
        <VBtn
          :disabled="changeRoleBtnDis"
          v-text="$t('admin.process')"
          @click="processBan"
        />
      </div>
    </div>
    <div
      v-else-if="changeRoleProcStat === procOptions.FINISHED"
      class="d-flex flex-row"
    >
      <VSpacer />
      <span class="mx-auto green--text" v-text="$t('admin.sucChRole')" />
    </div>
    <span
      v-else-if="changeRoleProcStat === procOptions.NOT_READY"
      v-text="$t('admin.emptyList')"
    />
  </VList>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import {
  ChangeRolePreviewUser,
  ChangeRoles,
  IMutRmElemAdminList
} from "@/types/admin";
import { adminOptions, adminProcOptions } from "@/plugins/enums/admin-options";
import { roles } from "@/plugins/enums/roles";

const adminMixin = namespace("adminMixin");

@Component({
  components: {
    AdminVListAvatar: () =>
      import(
        /* webpackChunkName: "AdminVListAvatar" */ "@/components/admin/AdminVListAvatar.vue"
      ),
    AdminVListContent: () =>
      import(
        /* webpackChunkName: "AdminVListContent" */ "@/components/admin/AdminVListContent.vue"
      ),
    AdminChRoleAction: () =>
      import(
        /* webpackChunkName: "AdminChRoleAction" */ "@/components/admin/roles/change/AdminChRoleAction.vue"
      )
  }
})
export default class AdminChangeRoleList extends Vue {
  @adminMixin.State prUsersToChangeRole!: ChangeRolePreviewUser[];
  @adminMixin.State changeRoleBtnDis!: boolean;
  @adminMixin.State changeRoleProcStat!: number;
  @adminMixin.Mutation removeUserFromList!: (data: IMutRmElemAdminList) => void;
  @adminMixin.Mutation clearAdminList!: (data: number) => void;
  @adminMixin.Action changeRoles!: (data: ChangeRoles) => Promise<string>;
  procOptions = adminProcOptions;
  allRoles = Object.values(roles);

  removeUser(index: number) {
    this.removeUserFromList({
      index: index,
      adminOption: adminOptions.CHANGE_ROLES
    });
  }

  processBan() {
    this.changeRoles({
      changeRoles: this.prUsersToChangeRole.map(prUserToChangeRole => {
        return {
          username: prUserToChangeRole.previewUser.user,
          oldRole: prUserToChangeRole.oldRole,
          newRole: prUserToChangeRole.newRole
        };
      })
    }).then(value => {
      if (value === "true") {
        this.clearAdminList(adminOptions.CHANGE_ROLES);
      }
    });
  }

  get borderColor() {
    return "border-style: solid; border-color: DarkGreen;";
  }
}
</script>

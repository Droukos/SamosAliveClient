<template>
  <VList rounded :style="borderColor">
    <h2 v-text="$t('admin.delRoleList')" />
    <VDivider />
    <div
      v-if="
        delRoleProcStat === procOptions.BUILD || prUsersToDelRole.length > 0
      "
    >
      <VListItem
        class="flex-wrap"
        v-for="(data, i) in prUsersToDelRole"
        :key="data.previewUser.id"
      >
        <AdminVListAvatar :prUser="data.previewUser" />
        <AdminVListContent :prUser="data.previewUser" />
        <VListItemAction>
          <VBtn @click="removeUser(i)">
            <VIcon v-text="'$close'" />
          </VBtn>
          <AdminDelRoleAction :previewUser="data.previewUser" :index="i" />
          <div
            v-if="checkMinLimit(data.previewUser.roles)"
            class="d-flex flex-row"
          >
            <VSpacer />
            <div class="d-flex flex-column">
              <span class="red--text" v-text="$t('admin.delMinLimit')" />
              <span class="red--text" v-text="$t('admin.hintRmUser')" />
            </div>
          </div>
        </VListItemAction>

        <div style="width: 100%; height: 0;" aria-hidden="true" />

        <VDivider inset />
      </VListItem>
      <div class="d-flex flex-row">
        <VSpacer />
        <VBtn
          :disabled="delRoleBtnDis"
          v-text="$t('admin.process')"
          @click="processBan"
        />
      </div>
    </div>
    <div
      v-else-if="delRoleProcStat === procOptions.FINISHED"
      class="d-flex flex-row"
    >
      <VSpacer />
      <span class="mx-auto green--text" v-text="$t('admin.sucDelRole')" />
    </div>
    <span
      v-else-if="delRoleProcStat === procOptions.NOT_READY"
      v-text="$t('admin.emptyList')"
    />
  </VList>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { IMutRmElemAdminList, UpdatePreviewUser, UpRoles } from "@/types/admin";
import { adminOptions, adminProcOptions } from "@/plugins/enums/admin-options";

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
    AdminDelRoleAction: () =>
      import(
        /* webpackChunkName: "AdminDelRoleAction" */ "@/components/admin/roles/del/AdminDelRoleAction.vue"
      )
  }
})
export default class AdminDelRoleList extends Vue {
  @adminMixin.State prUsersToDelRole!: UpdatePreviewUser[];
  @adminMixin.State delRoleBtnDis!: boolean;
  @adminMixin.State delRoleProcStat!: number;
  @adminMixin.Mutation removeUserFromList!: (data: IMutRmElemAdminList) => void;
  @adminMixin.Mutation clearAdminList!: (data: number) => void;
  @adminMixin.Action delRoles!: (data: UpRoles) => Promise<string>;
  procOptions = adminProcOptions;

  removeUser(index: number) {
    this.removeUserFromList({
      index: index,
      adminOption: adminOptions.DEL_ROLES
    });
  }

  processBan() {
    this.delRoles({
      upRoles: this.prUsersToDelRole.map(prUserToDelRole => {
        return {
          username: prUserToDelRole.previewUser.user,
          role: prUserToDelRole.updateRole
        };
      })
    }).then(value => {
      if (value === "true") {
        this.clearAdminList(adminOptions.DEL_ROLES);
      }
    });
  }

  checkMinLimit(roles: string[]) {
    return roles.length <= 1;
  }

  get borderColor() {
    return "border-style: solid; border-color: Crimson;";
  }
}
</script>

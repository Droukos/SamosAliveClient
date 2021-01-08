<template>
  <VList rounded :style="borderColor">
    <h2 v-text="$t('admin.addRoleList')" />
    <VDivider />
    <div
      v-if="
        addRoleProcStat === procOptions.BUILD || prUsersToAddRole.length > 0
      "
    >
      <VListItem
        class="flex-wrap"
        v-for="(data, i) in prUsersToAddRole"
        :key="data.previewUser.id"
      >
        <AdminVListAvatar :prUser="data.previewUser" />
        <AdminVListContent :prUser="data.previewUser" />
        <VListItemAction>
          <VBtn @click="removeUser(i)">
            <VIcon v-text="'$close'" />
          </VBtn>
          <AdminAddRoleAction
            :previewUser="data.previewUser"
            :index="i"
            :allRoles="allRoles"
          />
          <div
            v-if="checkMaxLimit(data.previewUser.roles)"
            class="d-flex flex-row"
          >
            <VSpacer />
            <div class="d-flex flex-column">
              <span class="red--text" v-text="$t('admin.addMaxLimit')" />
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
          :disabled="addRoleBtnDis"
          v-text="$t('admin.process')"
          @click="processBan"
        />
      </div>
    </div>
    <div
      v-else-if="addRoleProcStat === procOptions.FINISHED"
      class="d-flex flex-row"
    >
      <VSpacer />
      <span class="mx-auto green--text" v-text="$t('admin.sucAddRole')" />
    </div>
    <span
      v-else-if="addRoleProcStat === procOptions.NOT_READY"
      v-text="$t('admin.emptyList')"
    />
  </VList>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { IMutRmElemAdminList, UpdatePreviewUser, UpRoles } from "@/types/admin";
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
    AdminAddRoleAction: () =>
      import(
        /* webpackChunkName: "AdminVListContent" */ "@/components/admin/roles/add/AdminAddRoleAction.vue"
      )
  }
})
export default class AdminAddRoleList extends Vue {
  @adminMixin.State prUsersToAddRole!: UpdatePreviewUser[];
  @adminMixin.State addRoleBtnDis!: boolean;
  @adminMixin.State addRoleProcStat!: number;
  @adminMixin.Mutation removeUserFromList!: (data: IMutRmElemAdminList) => void;
  @adminMixin.Mutation clearAdminList!: (data: number) => void;
  @adminMixin.Action addRoles!: (data: UpRoles) => Promise<string>;
  procOptions = adminProcOptions;
  allRoles = Object.values(roles);

  removeUser(index: number) {
    this.removeUserFromList({
      index: index,
      adminOption: adminOptions.ADD_ROLES
    });
  }

  processBan() {
    this.addRoles({
      upRoles: this.prUsersToAddRole.map(prUserToAddRole => {
        return {
          username: prUserToAddRole.previewUser.user,
          role: prUserToAddRole.updateRole
        };
      })
    }).then(value => {
      if (value === "true") {
        this.clearAdminList(adminOptions.ADD_ROLES);
      }
    });
  }

  checkMaxLimit(roles: string[]) {
    return roles.length >= 3;
  }

  get borderColor() {
    return "border-style: solid; border-color: Aquamarine;";
  }
}
</script>

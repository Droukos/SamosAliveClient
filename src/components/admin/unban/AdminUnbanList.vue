<template>
  <VList rounded :style="borderColor">
    <h2 v-text="$t('admin.unbanList')" />
    <VDivider />
    <div
      v-if="unbanProcStat === procOptions.BUILD || prUsersToUnban.length > 0"
    >
      <VListItem
        class="flex-wrap"
        v-for="(data, i) in prUsersToUnban"
        :key="data.id"
      >
        <AdminVListAvatar :prUser="data" />
        <AdminVListContent :prUser="data" />
        <VListItemAction>
          <VBtn @click="removeUser(i)">
            <VIcon v-text="'$close'" />
          </VBtn>
        </VListItemAction>

        <div style="width: 100%; height: 0;" aria-hidden="true" />

        <VDivider inset />
      </VListItem>
      <div class="d-flex flex-row">
        <VSpacer />
        <VBtn
          :disabled="unbanBtnDis"
          v-text="$t('admin.process')"
          @click="processBan"
        />
      </div>
    </div>
    <div
      v-else-if="unbanProcStat === procOptions.FINISHED"
      class="d-flex flex-row"
    >
      <VSpacer />
      <span class="mx-auto green--text" v-text="$t('admin.sucUnban')" />
    </div>
    <span
      v-else-if="unbanProcStat === procOptions.NOT_READY"
      v-text="$t('admin.emptyList')"
    />
  </VList>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { PreviewUser } from "@/types";
import { adminOptions, adminProcOptions } from "@/plugins/enums/admin-options";
import { BannedUsers, IMutRmElemAdminList } from "@/types/admin";

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
      )
  }
})
export default class AdminUnbanList extends Vue {
  @adminMixin.State prUsersToUnban!: PreviewUser[];
  @adminMixin.State unbanBtnDis!: boolean;
  @adminMixin.State unbanProcStat!: number;
  @adminMixin.Mutation removeUserFromList!: (data: IMutRmElemAdminList) => void;
  @adminMixin.Mutation clearAdminList!: (data: number) => void;
  @adminMixin.Action unbanUsers!: (data: BannedUsers) => Promise<string>;
  procOptions = adminProcOptions;

  removeUser(index: number) {
    this.removeUserFromList({
      index: index,
      adminOption: adminOptions.UNBAN_USERS
    });
  }

  processBan() {
    this.unbanUsers({
      bannedUsers: this.prUsersToUnban.map(prUserToUnBan => {
        return {
          username: prUserToUnBan.user
        };
      })
    }).then(value => {
      if (value === "true") {
        this.clearAdminList(adminOptions.UNBAN_USERS);
      }
    });
  }

  get borderColor() {
    return "border-style: solid; border-color: DarkMagenta;";
  }
}
</script>

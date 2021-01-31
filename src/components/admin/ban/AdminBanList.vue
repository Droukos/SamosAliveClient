<template>
  <VList rounded :style="borderColor">
    <h2 v-text="$t('admin.banList')" />
    <VDivider />
    <div v-if="banProcStat === procOptions.BUILD || prUsersToBan.length > 0">
      <VListItem
        class="flex-wrap"
        v-for="(data, i) in prUsersToBan"
        :key="data.previewUser.id"
      >
        <AdminVListAvatar :prUser="data.previewUser" />
        <AdminVListContent :prUser="data.previewUser" />
        <VListItemAction>
          <VBtn @click="removeUser(i)">
            <VIcon v-text="'$close'" />
          </VBtn>
          <AdminBanDuration :banToUser="data" :i="i" />
        </VListItemAction>

        <div style="width: 100%; height: 0;" aria-hidden="true" />

        <VDivider inset />
      </VListItem>
      <div class="d-flex flex-row">
        <VSpacer />
        <VBtn
          :disabled="banBtnDis"
          v-text="$t('admin.process')"
          @click="processBan"
        />
      </div>
    </div>
    <div
      v-else-if="banProcStat === procOptions.FINISHED"
      class="d-flex flex-row"
    >
      <VSpacer />
      <span class="mx-auto green--text" v-text="$t('admin.sucBan')" />
    </div>
    <span
      v-else-if="banProcStat === procOptions.NOT_READY"
      v-text="$t('admin.emptyList')"
    />
  </VList>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { BanPreviewUser, BanUsers, MutRmElemAdminList } from "@/types/admin";
import { adminOptions, adminProcOptions } from "@/plugins/enums/admin-options";

const adminMixin = namespace("adminMixin");

@Component({
  components: {
    AdminVListAvatar: () =>
      import(
        /* webpackChunkName: "AdminVListAvatar" */ "@/components/admin/AdminVListAvatar.vue"
      ),
    AdminBanDuration: () =>
      import(
        /* webpackChunkName: "AdminBanDuration" */ "@/components/admin/ban/AdminBanDuration.vue"
      ),
    AdminVListContent: () =>
      import(
        /* webpackChunkName: "AdminVListContent" */ "@/components/admin/AdminVListContent.vue"
      )
  }
})
export default class AdminBanList extends Vue {
  @adminMixin.State prUsersToBan!: BanPreviewUser[];
  @adminMixin.State banBtnDis!: boolean;
  @adminMixin.State banProcStat!: number;
  @adminMixin.Mutation removeUserFromList!: (data: MutRmElemAdminList) => void;
  @adminMixin.Mutation clearAdminList!: (data: number) => void;
  @adminMixin.Action banUsers!: (data: BanUsers) => Promise<string>;
  procOptions = adminProcOptions;

  removeUser(index: number) {
    this.removeUserFromList({
      index: index,
      adminOption: adminOptions.BAN_USERS
    });
  }

  processBan() {
    this.banUsers({
      banUsers: this.prUsersToBan.map(prUserBan => {
        return {
          username: prUserBan.previewUser.user,
          duration: prUserBan.duration
        };
      })
    }).then(value => {
      if (value === "true") {
        this.clearAdminList(adminOptions.BAN_USERS);
      }
    });
  }

  get borderColor() {
    return "border-style: solid; border-color: DarkRed;";
  }
}
</script>

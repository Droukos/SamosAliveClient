<template>
  <VList>
    <h2 v-text="$t('admin.banList')" />
    <VDivider />
    <div v-if="prUsersToBan.length > 0">
      <VListItem
        class="flex-wrap"
        v-for="(i, data) in prUsersToBan"
        :key="data.previewUser.id"
      >
        <AdminVListAvatar :prUser="data.previewUser" />
        <AdminVListContent :prUser="data.previewUser" />
        <VListItemAction>
          <VBtn @click="removeUser(data.previewUser)">
            <VIcon v-text="'$close'" />
          </VBtn>

          <VTextField
            :label="$t('admin.banDuration')"
            :value="data.duration"
            dense
            single-line
            @keyup="setBanDuration"
            hide-details
            outlined
            style="width: 120px"
            :suffix="$t('time.hours')"
          />
        </VListItemAction>

        <div style="width: 100%; height: 0;" aria-hidden="true" />

        <VDivider inset />
      </VListItem>
      <div class="d-flex flex-row">
        <VSpacer />
        <VBtn v-text="$t('admin.process')" />
      </div>
    </div>
    <span v-else v-text="'Empty user list'" />
  </VList>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { BanPreviewUser, IMutToAdminList } from "@/types/admin";
import { PreviewUser } from "@/types";
import { adminOptions } from "@/plugins/enums/admin-options";

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
export default class AdminBanList extends Vue {
  @adminMixin.State prUsersToBan!: BanPreviewUser[];
  @adminMixin.Mutation removeUserFromList!: (data: IMutToAdminList) => void;

  removeUser(previewUser: PreviewUser) {
    this.removeUserFromList({
      prUser: previewUser,
      adminOption: adminOptions.BAN_USERS
    });
  }

  setBanDuration(val: any, data: BanPreviewUser) {
    console.log(val);
    console.log(data);
    //const value = parseInt(val.target.value);
    //if(!isNaN(value)) {
    //
    //}
  }
}
</script>

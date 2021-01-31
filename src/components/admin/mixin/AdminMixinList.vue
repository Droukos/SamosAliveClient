<template>
  <VList rounded :style="borderColor">
    <h2 v-text="$t('admin.undecidedList')" />
    <VDivider />
    <div v-if="undecidedPrUsers.length > 0">
      <VListItem
        class="flex-wrap"
        v-for="(data, i) in undecidedPrUsers"
        :key="data.id"
      >
        <AdminVListAvatar :prUser="data" />
        <AdminVListContent :prUser="data" />
        <VListItemAction>
          <VBtn @click="removeUser(i)">
            <VIcon v-text="'$close'" />
          </VBtn>
          <VMenu top close-on-click>
            <template v-slot:activator="{ on, attrs }">
              <VBtn v-bind="attrs" v-on="on">
                <VIcon v-text="'$headAll'" />
              </VBtn>
            </template>

            <div v-for="btn in adminBtns" :key="btn.adminOption">
              <VTooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <VBtn
                    v-bind="attrs"
                    v-on="on"
                    @click="selectPrUserToList(data, btn.adminOption, i)"
                  >
                    <VIcon v-text="btn.icon" />
                  </VBtn>
                </template>
                <span v-text="btn.i18n" />
              </VTooltip>
            </div>
          </VMenu>
        </VListItemAction>

        <div style="width: 100%; height: 0;" aria-hidden="true" />

        <VDivider inset />
      </VListItem>
    </div>
    <span v-else v-text="$t('admin.emptyList')" />
  </VList>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { adminOptions, adminProcOptions } from "@/plugins/enums/admin-options";
import { MutRmElemAdminList, MutToAdminList } from "@/types/admin";
import { namespace } from "vuex-class";
import { PreviewUser } from "@/types";

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
export default class AdminMixinList extends Vue {
  @adminMixin.State undecidedPrUsers!: PreviewUser[];
  @adminMixin.Mutation setPrUserToAdminList!: (data: MutToAdminList) => void;
  @adminMixin.Mutation removeUserFromList!: (data: MutRmElemAdminList) => void;
  @adminMixin.Mutation clearAdminList!: (data: number) => void;
  procOptions = adminProcOptions;

  removeUser(index: number) {
    this.removeUserFromList({
      index: index,
      adminOption: adminOptions.MIXIN
    });
  }

  selectPrUserToList(prUser: PreviewUser, adminOption: number, index: number) {
    this.setPrUserToAdminList({
      prUser: prUser,
      adminOption: adminOption
    });
    this.removeUserFromList({
      index: index,
      adminOption: adminOptions.MIXIN
    });
  }

  get adminBtns() {
    return [
      {
        i18n: this.$t("admin.banS"),
        icon: "$gavel",
        adminOption: adminOptions.BAN_USERS
      },
      {
        i18n: this.$t("admin.unbanS"),
        icon: "$gavel",
        adminOption: adminOptions.UNBAN_USERS
      },
      {
        i18n: this.$t("admin.chaRolesS"),
        icon: "$chessRook",
        adminOption: adminOptions.CHANGE_ROLES
      },
      {
        i18n: this.$t("admin.addRolesS"),
        icon: "$headPlus",
        adminOption: adminOptions.ADD_ROLES
      },
      {
        i18n: this.$t("admin.delRolesS"),
        icon: "$headMinus",
        adminOption: adminOptions.DEL_ROLES
      }
    ];
  }

  get borderColor() {
    return "border-style: solid; border-color: LightSlateGrey;";
  }
}
</script>

<template>
  <VTextField
    :label="$t('admin.banDuration')"
    :value="banToUser.duration"
    :error-messages="errorMsgs"
    dense
    single-line
    @keyup="setBanDuration"
    outlined
    style="width: 120px"
    :suffix="$t('time.hours')"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BanPreviewUser, ReplacePrUser } from "@/types/admin";
import { namespace } from "vuex-class";
import { adminOptions } from "@/plugins/enums/admin-options";
import { LocaleMessage } from "vue-i18n";

const adminMixin = namespace("adminMixin");

@Component
export default class AdminBanDuration extends Vue {
  @Prop() banToUser!: BanPreviewUser;
  @Prop() i!: number;
  @adminMixin.Mutation replacePrUserToAdminList!: (data: ReplacePrUser) => void;
  errorMsgs: LocaleMessage = "";

  setBanDuration(val: any) {
    const value = parseInt(val.target.value);
    this.errorMsgs = "";
    this.replacePrUserToAdminList({
      prUser: this.banToUser.previewUser,
      adminOption: adminOptions.BAN_USERS,
      index: this.i,
      duration: value
    });
    if (isNaN(value)) {
      this.errorMsgs = this.$t("validations.fieldNumber");
    }
  }
}
</script>

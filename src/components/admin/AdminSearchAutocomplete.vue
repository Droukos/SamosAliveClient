<template>
  <v-autocomplete
    v-model="model"
    :items="previewUsers"
    :loading="isLoading"
    @keyup="search"
    :counter="120"
    clearable
    hide-details
    hide-selected
    outlined
    item-text="user"
    item-value="user"
    :label="$t('search.title') + ' ' + $t('fields.username')"
    solo
    multiple
  >
    <template v-slot:selection="{ attr, on, item, selected }">
      <v-chip
        v-bind="attr"
        :input-value="selected"
        color="blue-grey"
        class="white--text"
        v-on="on"
      >
        <VAvatar :size="40">
          <AvatarBase :avatar="item.avatar" :username="item.user" :size="40" />
        </VAvatar>
        <span v-text="item.user" />
      </v-chip>
    </template>
    <template v-slot:item="{ item }">
      <AdminVListAvatar :prUser="item" :selectable="selectedUser" />
      <AdminVListContent :prUser="item" :selectable="selectedUser" />
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import debounce from "@/plugins/helpers/debounce";
import { PreviewUser } from "@/types";
import { IMutToAdminList } from "@/types/admin";

const adminMixin = namespace("adminMixin");

@Component({
  components: {
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase.vue"
      ),
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
export default class SearchMainTextField extends Vue {
  @Prop() adminOption!: number;
  model = "";
  isLoading = false;
  @adminMixin.State previewUsers!: PreviewUser[];
  @adminMixin.Mutation setPrUserToAdminList!: (data: IMutToAdminList) => void;
  @adminMixin.Action fetchUsersPreview!: (
    user: string
  ) => Promise<PreviewUser[]>;

  fetchUserPreviewList(val: string) {
    if (val.length < 3) {
      return;
    }
    this.isLoading = true;
    this.fetchUsersPreview(val).finally(() => (this.isLoading = false));
  }

  selectedUser(prUser: PreviewUser) {
    this.setPrUserToAdminList({
      prUser: prUser,
      adminOption: this.adminOption
    });
  }

  search = debounce(val => {
    this.fetchUserPreviewList(val.target.value);
  }, 700);
}
</script>

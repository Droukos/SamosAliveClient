<template>
  <VListItemAvatar @click="selectUser()">
    <AvatarBase :avatar="prUser.avatar" :username="prUser.user" :size="70" />
  </VListItemAvatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PreviewUser } from "@/types";

@Component({
  components: {
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase.vue"
      )
  }
})
export default class AdminVListAvatar extends Vue {
  @Prop() prUser!: PreviewUser;
  @Prop() selectable!: (prUser: PreviewUser) => void;

  selectUser() {
    if (this.selectable != null) {
      this.selectable(this.prUser);
    }
  }
}
</script>

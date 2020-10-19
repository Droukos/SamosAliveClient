<template>
  <div :style="'width: ' + size">
    <v-card
      v-if="doesAvatarNotExists"
      class="d-flex align-center justify-center"
      :style="profileBackStyle"
    >
      <span>{{ usernameFirstLetter }}</span>
    </v-card>
    <div v-else class="d-flex justify-center">
      <span
        ><img
          :src="avatar"
          :style="profileBackStyle"
          alt
          class="user-profile-avatar"
      /></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/plugins/helpers/helper.ts";

@Component
export default class AvatarBase extends Vue {
  @Prop()
  public avatar: string | undefined;
  @Prop()
  public username!: string;
  @Prop()
  public size!: string;

  setBackgroundColor(username: string) {
    return this.$helper.usernameHashCode(username);
  }

  get doesAvatarNotExists() {
    return this.avatar == undefined || this.avatar == "";
  }
  get usernameFirstLetter() {
    return this.username.charAt(0).toUpperCase();
  }
  get profileBackStyle() {
    return "box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);color:black;background-color:".concat(
      this.setBackgroundColor(this.username),
      ";height:",
      this.size,
      "px !important;width:",
      this.size,
      "px !important;"
    );
  }
}
</script>

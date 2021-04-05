<template>
  <div :style="'width: ' + size">
    <v-card
      v-if="doesAvatarNotExists"
      class="d-flex align-center justify-center"
      :style="profileBackStyle"
    >
      <span v-text="usernameFirstLetter" />
    </v-card>
    <div v-else class="d-flex justify-center">
      <span>
        <img
          :src="avatarFromCloudinary"
          :style="profileBackStyle"
          alt
          class="user-profile-avatar"
          :key="avatar"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/plugins/helpers/helper.ts";
import { cloudinaryUrl } from "@/plugins/api/cloudinary";

@Component
export default class AvatarBase extends Vue {
  @Prop()
  avatar!: string | null;
  @Prop()
  username!: string;
  @Prop()
  size!: string;

  get doesAvatarNotExists() {
    return this.avatar == null || this.avatar == "";
  }
  get usernameFirstLetter() {
    return this.username.charAt(0).toUpperCase();
  }
  get avatarFromCloudinary() {
    return cloudinaryUrl + this.avatar;
  }

  get profileBackStyle() {
    const bkColor = this.$helper.usernameHashCode(this.username);
    const letterColor =
      this.$helper.getColorLuma(bkColor) < 125
        ? this.$helper.adjustColor(bkColor, 150)
        : this.$helper.adjustColor(bkColor, -150);

    const letterSize = parseInt(this.size) > 60 ? "40px" : "18px";
    return "box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);color:".concat(
      letterColor,
      ";font-size:",
      letterSize,
      ";background-color:",
      bkColor,
      ";height:",
      this.size,
      "px !important;width:",
      this.size,
      "px !important;"
    );
  }
}
</script>

<template>
  <div class="d-flex justify-center">
    <span>
      <img
        :src="devicePic"
        :style="picBackStyle"
        alt
        class="user-profile-avatar"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { cloudinaryUrl } from "@/plugins/api/cloudinary";

@Component
export default class AedDevicePic extends Vue {
  @Prop()
  url!: string;
  @Prop()
  size!: string;

  get devicePic() {
    return cloudinaryUrl + this.url;
  }

  get picBackStyle() {
    return "box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);color:black;background-color:".concat(
      ";height:",
      this.size,
      "px !important;width:",
      this.size,
      "px !important;"
    );
  }
}
</script>

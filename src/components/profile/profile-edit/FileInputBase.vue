<template>
  <div :style="styl">
    <v-file-input
      chips
      show-size
      :rules="fileRules($t('fields.avatar'))"
      accept="image/*"
      v-model="fileImg.selectedFile"
      @change="fileSelected()"
      clearable
      prepend-icon="mdi-camera"
      :label="$t('fields.avatar')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FieldObject, FileImg } from "@/types";
import { TranslateResult } from "vue-i18n";
import { namespace } from "vuex-class";
import {
  checkFileType,
  checkIfFileSizeIsUnderMB,
  getFileRules
} from "@/plugins/helpers/filesUtil";

const editProfileModule = namespace("editProfile");
const profileModule = namespace("profile");

@Component
export default class FileInputBase extends Vue {
  @Prop() styl!: string;
  @Prop() uploadVis!: (bool: boolean) => boolean;
  @profileModule.State avatar!: string;
  @editProfileModule.State fAvatar!: FieldObject;
  @editProfileModule.State fileImg!: FileImg;

  fileSelected() {
    this.fileImg.notUsedImgUpload = false;
    if (this.fileImg.selectedFile == undefined) {
      this.uploadVis(false);
      return;
    }
    if (
      checkIfFileSizeIsUnderMB(this.fileImg, 1) &&
      checkFileType(this.fileImg)
    ) {
      this.fAvatar.v = URL.createObjectURL(this.fileImg.selectedFile);
      this.uploadVis(true);
    } else {
      this.fAvatar.v = this.avatar;
      this.uploadVis(false);
    }
  }

  fileRules(field: TranslateResult) {
    return getFileRules(field, this.fileImg);
  }
}
</script>

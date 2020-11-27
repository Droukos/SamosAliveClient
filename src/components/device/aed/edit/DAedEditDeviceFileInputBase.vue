<template>
  <div :style="styl">
    <v-file-input
      chips
      show-size
      :rules="fileRules($t('device-register.devPic'))"
      accept="image/*"
      v-model="deviceFileImg.selectedFile"
      @change="fileSelected()"
      clearable
      prepend-icon="$camera"
      :label="$t('device-register.devPic')"
    ></v-file-input>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FieldObject2, FileImg } from "@/types";
import {
  checkFileType,
  checkIfFileSizeIsUnderMB,
  getFileRules
} from "@/plugins/helpers/filesUtil";
import { TranslateResult } from "vue-i18n";
import { namespace } from "vuex-class";

const aedDeviceEdit = namespace("aedDeviceEdit");

@Component
export default class DAedEditDeviceFileInputBase extends Vue {
  @Prop() styl!: string;
  @aedDeviceEdit.State fDevicePicture!: FieldObject2;
  @aedDeviceEdit.State deviceFileImg!: FileImg;
  @aedDeviceEdit.Mutation setDevicePicError!: (error: string) => void;
  @aedDeviceEdit.Action vForm!: () => void;

  fileSelected() {
    this.deviceFileImg.notUsedImgUpload = false;
    if (
      checkIfFileSizeIsUnderMB(this.deviceFileImg, 1) &&
      checkFileType(this.deviceFileImg)
    ) {
      //this.fDevicePicture.v = URL.createObjectURL(
      //  this.deviceFileImg.selectedFile
      //);
      this.fDevicePicture.v = this.deviceFileImg.selectedFile;
      this.setDevicePicError("");
      this.vForm();
    } else {
      this.setDevicePicError("error");

      //this.fDevicePicture.v = this.$store.getters.getAvatar;
    }
  }

  fileRules(field: TranslateResult) {
    return getFileRules(field, this.deviceFileImg);
  }
}
</script>

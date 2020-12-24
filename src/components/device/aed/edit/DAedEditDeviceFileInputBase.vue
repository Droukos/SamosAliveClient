<template>
  <div class="d-flex flex-row" :style="styl">
    <v-col>
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
      />
      <v-btn
        block
        rounded
        v-if="readyUpload"
        class="deep-purple darken-2"
        style="color:white;"
        @click="uploadDeviceImg()"
        aria-label="AedCreate"
        v-text="$t('edit.upload')"
      />
      <span
        v-if="showUploadedDevicePic"
        class="green--text text--darken-2"
        v-text="$t('edit.updated')"
      />
      <span
        v-if="showErrorDevicePic"
        class="red--text text--darken-2"
        v-text="$t('edit.errorUpdated')"
      />x
    </v-col>
    <v-avatar v-if="tempFile !== ''" tile size="160">
      <img :src="tempFile" alt />
    </v-avatar>
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

const aedDeviceInfo = namespace("aedDeviceInfo");
const aedDeviceEdit = namespace("aedDeviceEdit");

@Component
export default class DAedEditDeviceFileInputBase extends Vue {
  @Prop() styl!: string;
  @aedDeviceInfo.State id!: string;
  @aedDeviceEdit.State fDevicePicture!: FieldObject2;
  @aedDeviceEdit.State deviceFileImg!: FileImg;
  @aedDeviceEdit.State showUploadedDevicePic!: boolean;
  @aedDeviceEdit.State showErrorDevicePic!: boolean;
  @aedDeviceEdit.Action uploadDevicePic!: (id: string) => void;
  tempFile = "";
  readyUpload = false;

  fileSelected() {
    this.deviceFileImg.notUsedImgUpload = false;
    if (this.deviceFileImg.selectedFile == undefined) {
      this.tempFile = "";
      this.readyUpload = false;
      return;
    }
    if (
      checkIfFileSizeIsUnderMB(this.deviceFileImg, 1) &&
      checkFileType(this.deviceFileImg)
    ) {
      this.tempFile = URL.createObjectURL(this.deviceFileImg.selectedFile);
      this.fDevicePicture.v = this.deviceFileImg.selectedFile;
      this.readyUpload = true;
    } else {
      this.readyUpload = false;
    }
  }

  uploadDeviceImg() {
    this.uploadDevicePic(this.id);
  }

  fileRules(field: TranslateResult) {
    return getFileRules(field, this.deviceFileImg);
  }
}
</script>

<template>
  <div class="d-flex flex-row" :style="styl">
    <v-col>
      <v-file-input
        chips
        show-size
        :rules="fileRules($t('device-register.addrPic'))"
        accept="image/*"
        v-model="addrFileImg.selectedFile"
        @change="fileSelected()"
        clearable
        prepend-icon="$camera"
        :label="$t('device-register.addrPic')"
      ></v-file-input>
      <v-btn
        block
        rounded
        v-if="readyUpload"
        class="deep-purple darken-2"
        style="color:white;"
        @click="uploadAddressImg()"
        aria-label="AedCreate"
      >
        {{ $t("edit.upload") }}
      </v-btn>
      <span
        v-if="showUploadedDeviceAddrPic"
        class="green--text text--darken-2"
        >{{ $t("edit.updated") }}</span
      >
      <span v-if="showErrorDeviceAddrPic" class="red--text text--darken-2">{{
        $t("edit.errorUpdated")
      }}</span>
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
export default class DAedAddressFileInputBase extends Vue {
  @Prop() styl!: string;
  @aedDeviceInfo.State id!: string;
  @aedDeviceEdit.State fAddressPicture!: FieldObject2;
  @aedDeviceEdit.State showUploadedDeviceAddrPic!: boolean;
  @aedDeviceEdit.State showErrorDeviceAddrPic!: boolean;
  @aedDeviceEdit.State addrFileImg!: FileImg;
  @aedDeviceEdit.Action uploadDeviceAddressPic!: (id: string) => void;
  tempFile = "";
  readyUpload = false;

  fileSelected() {
    this.addrFileImg.notUsedImgUpload = false;
    if (this.addrFileImg.selectedFile == undefined) {
      this.tempFile = "";
      this.readyUpload = false;
      return;
    }
    if (
      checkIfFileSizeIsUnderMB(this.addrFileImg, 1) &&
      checkFileType(this.addrFileImg)
    ) {
      this.tempFile = URL.createObjectURL(this.addrFileImg.selectedFile);
      this.fAddressPicture.v = this.addrFileImg.selectedFile;
      this.readyUpload = true;
    } else {
      this.tempFile = "";
      this.readyUpload = false;
    }
  }
  uploadAddressImg() {
    this.uploadDeviceAddressPic(this.id);
  }

  fileRules(field: TranslateResult) {
    return getFileRules(field, this.addrFileImg);
  }
}
</script>

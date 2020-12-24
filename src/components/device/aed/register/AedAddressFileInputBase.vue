<template>
  <div class="d-flex flex-row" :style="styl">
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
    />
    <v-avatar v-if="tempFile !== ''" tile size="160">
      <img :src="tempFile" alt />
    </v-avatar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FieldObject2, FileImg } from "@/types";
import { TranslateResult } from "vue-i18n";
import { namespace } from "vuex-class";
import {
  checkFileType,
  checkIfFileSizeIsUnderMB,
  getFileRules
} from "@/plugins/helpers/filesUtil";

const aedDeviceRegister = namespace("aedDeviceRegister");

@Component
export default class AedAddressFileInputBase extends Vue {
  @Prop() styl!: string;
  @aedDeviceRegister.State fAddressPicture!: FieldObject2;
  @aedDeviceRegister.State addrFileImg!: FileImg;
  @aedDeviceRegister.Mutation setAddressPicError!: (error: string) => void;
  @aedDeviceRegister.Action vForm!: () => void;
  tempFile = "";

  fileSelected() {
    this.addrFileImg.notUsedImgUpload = false;
    if (
      checkIfFileSizeIsUnderMB(this.addrFileImg, 1) &&
      checkFileType(this.addrFileImg)
    ) {
      //this.fAddressPicture.v = URL.createObjectURL(
      //  this.addrFileImg.selectedFile
      //);
      this.tempFile = URL.createObjectURL(this.addrFileImg.selectedFile);
      //console.log(this.addrFileImg.selectedFile);
      this.fAddressPicture.v = this.addrFileImg.selectedFile;
      this.setAddressPicError("");
      this.vForm();
    } else {
      this.setAddressPicError("error");
      //this.fAddressPicture.e = "error";

      //this.fAddressPicture.v = this.$store.getters.getAvatar;
    }
  }

  fileRules(field: TranslateResult) {
    return getFileRules(field, this.addrFileImg);
  }
}
</script>

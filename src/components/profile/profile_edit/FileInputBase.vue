<template>
  <div :style="styl">
    <v-file-input
      chips
      show-size
      :rules="getFileRules($t('fields.avatar'))"
      accept="image/*"
      v-model="fileImg.selectedFile"
      @change="fileSelected()"
      clearable
      prepend-icon="mdi-camera"
      :label="$t('fields.avatar')"
    ></v-file-input>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FieldObject, FileImg } from "@/types";
import { TranslateResult } from "vue-i18n";
import { namespace } from "vuex-class";

const editProfileModule = namespace("editProfile");

@Component
export default class FileInputBase extends Vue {
  @Prop() public styl!: string;
  @Prop() public uploadVis!: (bool: boolean) => boolean;
  @editProfileModule.State fAvatar!: FieldObject;
  @editProfileModule.State fileImg!: FileImg;

  fileSelected() {
    this.fileImg.notUsedImgUpload = false;
    if (this.checkFileSize() && this.checkFileType()) {
      this.fAvatar.v = URL.createObjectURL(this.fileImg.selectedFile);
      this.uploadVis(true);
    } else {
      this.fAvatar.v = this.$store.getters.getAvatar;
      this.uploadVis(false);
    }
  }
  checkFileSize() {
    if (this.fileImg.selectedFile.name == "") return false;
    return this.fileImg.selectedFile.size / 1024 / 1024 <= 1;
  }
  checkFileType() {
    let warnFileType = false;
    if (this.fileImg.selectedFile.name == "") return false;
    for (let i = 0; i < this.fileImg.validFileExtensions.length; i++) {
      const sCurExtension = this.fileImg.validFileExtensions[i];
      if (
        this.fileImg.selectedFile.name
          .substr(
            this.fileImg.selectedFile.name.length - sCurExtension.length,
            sCurExtension.length
          )
          .toLowerCase() == sCurExtension.toLowerCase()
      ) {
        warnFileType = true;
        break;
      }
    }

    return warnFileType;
  }
  getFileRules(field: TranslateResult) {
    return [
      (value: { size: number }) =>
        !value ||
        value.size < 1000000 ||
        this.$t("validations.fileSize", [field, 1]),
      (value: any) =>
        !value ||
        this.checkFileType() ||
        this.$t("validations.fileValid", [field])
    ];
  }
}
</script>

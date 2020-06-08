<template>
  <div :class="clazz" :style="styl">
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

<script>
export default {
  props: ["fileImg", "clazz", "styl", "uploadVis", "editForm"],
  methods: {
    fileSelected() {
      this.fileImg.notUsedImgUpload = false;
      if(this.checkFileSize() && this.checkFileType()) {
        this.editForm.avatar = URL.createObjectURL(this.fileImg.selectedFile);
        this.uploadVis(true);
      }else {
         this.editForm.avatar = this.$store.getters.getAvatar;
         this.uploadVis(false);
      }
    },
    checkFileSize: function() {
      if(this.fileImg.selectedFile == null) return false;
      return (this.fileImg.selectedFile.size / 1024 / 1024) <= 1;
    },
    checkFileType: function() {
      let warnFileType = false;
      if(this.fileImg.selectedFile == null) return false;
      for (var i = 0; i < this.fileImg.validFileExtensions.length; i++) {
        let sCurExtension = this.fileImg.validFileExtensions[i];
        if (this.fileImg.selectedFile.name
        .substr(this.fileImg.selectedFile.name.length - sCurExtension.length,sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
          warnFileType = true;
          break;
        }
      }

      return warnFileType;
    },
    getFileRules(field) {
      return [
        value =>
          !value ||
          value.size < 1000000 ||
          this.$t("validations.file_size", [field, 1]),
        value =>
          !value ||
          this.checkFileType() ||
          this.$t("validations.file_valid", [field])
      ];
    }
  }
};
</script>

<style>
</style>
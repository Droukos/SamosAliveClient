<template>
  <v-text-field
    v-model="fModelName.v"
    @input="validateAndCheckForm()"
    :error-messages="fModelName.e"
    :counter="30"
    :label="fModelName.f"
    required
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FieldObject } from "@/types";
import { validateName } from "@/plugins/validators";
import { namespace } from "vuex-class";

const aedDeviceInfo = namespace("aedDeviceInfo");
const aedDeviceEdit = namespace("aedDeviceEdit");

@Component
export default class DAedEditModelNameInputBase extends Vue {
  @aedDeviceEdit.State fModelName!: FieldObject;
  @aedDeviceInfo.State modelName!: string;
  @aedDeviceEdit.Action vForm!: () => void;

  validateAndCheckForm() {
    validateName(this.fModelName);
    //if (this.fModelName.v == this.modelName) {
    //  this.fModelName.e = this.$t("edit.sameInput");
    //}
    this.vForm();
  }
}
</script>

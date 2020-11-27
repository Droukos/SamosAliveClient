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

const aedDeviceRegister = namespace("aedDeviceRegister");

@Component
export default class ModelNameInputBase extends Vue {
  @aedDeviceRegister.State fModelName!: FieldObject;
  @aedDeviceRegister.Action vForm!: () => void;

  validateAndCheckForm() {
    validateName(this.fModelName);
    this.vForm();
  }
}
</script>

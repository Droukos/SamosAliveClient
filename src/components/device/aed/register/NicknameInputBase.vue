<template>
  <v-text-field
    v-model="fNickname.v"
    @input="validateAndCheckForm()"
    :error-messages="fNickname.e"
    :counter="30"
    :label="fNickname.f"
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
export default class NicknameInputBase extends Vue {
  @aedDeviceRegister.State fNickname!: FieldObject;
  @aedDeviceRegister.Action vForm!: () => void;

  validateAndCheckForm() {
    validateName(this.fNickname);
    this.vForm();
  }
}
</script>

<template>
  <v-text-field
    v-model="fSurname.v"
    @input="validateAndCheckForm()"
    :error-messages="fSurname.e"
    :counter="30"
    :label="fSurname.f"
    required
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validateSurname } from "@/plugins/validators";
import { namespace } from "vuex-class";
import { FieldObject } from "@/types";

const editProfile = namespace("editProfile");

@Component
export default class SurnameBaseInput extends Vue {
  @editProfile.State fSurname!: FieldObject;
  @editProfile.Action vForm!: () => void;

  validateAndCheckForm() {
    validateSurname(this.fSurname);
    this.vForm();
  }
}
</script>

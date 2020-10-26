<template>
  <v-text-field
    v-model="fName.v"
    @input="validateAndCheckForm()"
    :error-messages="fName.e"
    :counter="30"
    :label="fName.f"
    required
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validateName } from "@/plugins/validators";
import { namespace } from "vuex-class";
import { FieldObject } from "@/types";

const editProfile = namespace("editProfile");

@Component
export default class NameBaseInput extends Vue {
  @editProfile.State fName!: FieldObject;
  @editProfile.Action vForm!: () => void;

  validateAndCheckForm() {
    validateName(this.fName);
    this.vForm();
  }
}
</script>

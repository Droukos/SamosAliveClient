<template>
  <v-text-field
    v-model="fTitle.v"
    @input="validateAndCheckForm()"
    :error-messages="fTitle.e"
    :counter="50"
    :label="fTitle.f"
    required
    solo
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FieldObject } from "@/types";
import { namespace } from "vuex-class";

const aedProblemsCreate = namespace("aedProblemsCreate");

@Component
export default class AedProblemsInputTitle extends Vue {
  @aedProblemsCreate.State fTitle!: FieldObject;
  @aedProblemsCreate.Action vForm!: () => void;

  validateAndCheckForm() {
    //validateName(this.fTitle);
    this.vForm();
  }
}
</script>

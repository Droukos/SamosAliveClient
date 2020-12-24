<template>
  <v-text-field
    v-model="fBody.v"
    @input="validateAndCheckForm()"
    :error-messages="fBody.e"
    :counter="500"
    :label="fBody.f"
    maxlength="500"
    full-width
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FieldObject } from "@/types";
import { namespace } from "vuex-class";

const aedProblemsCreate = namespace("aedProblemsCreate");

@Component
export default class AedProblemsInputBody extends Vue {
  @aedProblemsCreate.State fBody!: FieldObject;
  @aedProblemsCreate.Action vForm!: () => void;

  validateAndCheckForm() {
    this.vForm();
  }
}
</script>

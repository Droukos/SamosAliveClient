<template>
  <v-text-field
    v-model="fContent.v"
    @input="validateAndCheckForm()"
    :error-messages="fContent.e"
    :counter="50"
    :label="fContent.f"
    maxlength="50"
    full-width
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FieldObject } from "@/types";
import { namespace } from "vuex-class";

const newsCreate = namespace("newsCreate");

@Component
export default class NewsContentInput extends Vue {
  @newsCreate.State fContent!: FieldObject;
  @newsCreate.Action vForm!: () => void;

  validateAndCheckForm() {
    this.vForm();
  }
}
</script>

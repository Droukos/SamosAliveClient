<template>
  <v-text-field
    v-model="fNewsTitle.v"
    @input="validateAndCheckForm()"
    :error-messages="fNewsTitle.e"
    :counter="50"
    :label="fNewsTitle.f"
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
export default class NewsTitleInput extends Vue {
  @newsCreate.State fNewsTitle!: FieldObject;
  @newsCreate.Action vForm!: () => void;

  validateAndCheckForm() {
    this.vForm();
  }
}
</script>

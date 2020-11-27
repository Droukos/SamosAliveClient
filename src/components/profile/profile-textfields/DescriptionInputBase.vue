<template>
  <v-textarea
    v-model="fDescription.v"
    :auto-grow="true"
    @input="validateAndCheckForm()"
    :error-messages="fDescription.e"
    :counter="textareaProps.counter ? textareaProps.counter : false"
    :hint="$t('edit.descriptionHint', [$t('fields.profile')])"
    :label="fDescription.f"
    :row-height="textareaProps.rowHeight"
    :rows="textareaProps.rows"
  ></v-textarea>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validateDescription } from "@/plugins/validators";
import { namespace } from "vuex-class";
import { FieldObject } from "@/types";

const editProfile = namespace("editProfile");

@Component
export default class DescriptionBaseInput extends Vue {
  @editProfile.State fDescription!: FieldObject;
  @editProfile.Action vForm!: () => void;
  textareaProps = {
    counter: 0,
    rowHeight: 24,
    rows: 1
  };

  validateAndCheckForm() {
    validateDescription(this.fDescription);
    this.vForm();
  }
}
</script>

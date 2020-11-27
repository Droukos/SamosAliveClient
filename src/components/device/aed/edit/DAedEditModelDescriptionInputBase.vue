<template>
  <v-textarea
    v-model="fModelDescription.v"
    :auto-grow="true"
    @input="validateAndCheckForm()"
    :error-messages="fModelDescription.e"
    :counter="textareaProps.counter ? textareaProps.counter : false"
    :hint="$t('edit.descriptionHint', [$t('fields.aed')])"
    :label="fModelDescription.f"
    :row-height="textareaProps.rowHeight"
    :rows="textareaProps.rows"
  ></v-textarea>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FieldObject } from "@/types";
import { validateDescription } from "@/plugins/validators";
import { namespace } from "vuex-class";

const aedDeviceEdit = namespace("aedDeviceEdit");

@Component
export default class DAedEditModelDescriptionInputBase extends Vue {
  @aedDeviceEdit.State fModelDescription!: FieldObject;
  @aedDeviceEdit.Action vForm!: () => void;
  textareaProps = {
    counter: 0,
    rowHeight: 24,
    rows: 1
  };

  validateAndCheckForm() {
    validateDescription(this.fModelDescription);
    this.vForm();
  }
}
</script>

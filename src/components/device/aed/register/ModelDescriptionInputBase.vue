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
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validateDescription } from "@/plugins/validators";
import { namespace } from "vuex-class";
import { FieldObject } from "@/types";

const aedDeviceRegister = namespace("aedDeviceRegister");

@Component
export default class DescriptionBaseInput extends Vue {
  @aedDeviceRegister.State fModelDescription!: FieldObject;
  @aedDeviceRegister.Action vForm!: () => void;
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

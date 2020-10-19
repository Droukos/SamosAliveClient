<template>
  <v-text-field
    v-model="name.v"
    @input="validateAndCheckForm()"
    :error-messages="name.e"
    :counter="30"
    :label="name.f"
    prepend-icon="$accountOut"
    required
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { validateName } from "@/plugins/validators";

@Component
export default class NameBaseInput extends Vue {
  @Prop() vForm!: () => void;
  name = {
    f: this.$t("fields.name"),
    v: "",
    e: "",
    run: false
  };

  validateAndCheckForm() {
    validateName(this.name);
    this.vForm();
  }
}
</script>

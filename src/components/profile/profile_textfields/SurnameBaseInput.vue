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
import { validateSurname } from "@/plugins/validators";

@Component
export default class SurnameBaseInput extends Vue {
  @Prop() vForm!: () => void;
  surname = {
    f: this.$t("fields.surname"),
    v: "",
    e: "",
    run: false
  };

  validateAndCheckForm() {
    validateSurname(this.surname);
    this.vForm();
  }
}
</script>

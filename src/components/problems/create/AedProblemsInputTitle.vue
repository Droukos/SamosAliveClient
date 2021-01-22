<template>
  <v-select
    v-model="selected"
    :items="items"
    item-text="msg"
    item-value="code"
    v-on:change="selectTitle(selected)"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedProblemsCreate = namespace("aedProblemsCreate");

@Component
export default class AedProblemsInputTitle extends Vue {
  items = [
    { msg: this.$t("problems.problemS0"), code: 0 },
    { msg: this.$t("problems.problemS1"), code: 1 },
    { msg: this.$t("problems.problemS2"), code: 2 },
    { msg: this.$t("problems.problemS3"), code: 3 }
  ];
  selected = this.items[0].code;

  @aedProblemsCreate.Mutation setTitle!: (title: number) => void;
  @aedProblemsCreate.Action vForm!: () => void;

  selectTitle(code: number) {
    this.setTitle(code);
    this.vForm();
  }
}
</script>

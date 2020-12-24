<template>
  <span v-text="technical" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedProblemsInfo = namespace("aedProblemsInfo");

@Component
export default class AedProblemsTechnical extends Vue {
  @aedProblemsInfo.State technical!: string;
}
</script>

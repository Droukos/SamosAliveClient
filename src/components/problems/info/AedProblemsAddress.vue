<template>
  <span>{{ address }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedProblemsInfo = namespace("aedProblemsInfo");

@Component
export default class AedProblemsAddress extends Vue {
  @aedProblemsInfo.State address!: string;
}
</script>

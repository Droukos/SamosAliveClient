<template>
  <span>{{ username }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedProblemsInfo = namespace("aedProblemsInfo");

@Component
export default class AedProblemsUsername extends Vue {
  @aedProblemsInfo.State username!: string;
}
</script>

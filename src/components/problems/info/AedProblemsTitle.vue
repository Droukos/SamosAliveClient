<template>
  <span>{{ title }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedProblemsInfo = namespace("aedProblemsInfo");


@Component
export default class AedProblemsTitle extends Vue {
  @aedProblemsInfo.State title!: string;
}
</script>

<template>
  <span v-text="$helper.convDate2(completedTime, 'long', locale)" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedProblemsInfo = namespace("aedProblemsInfo");
const environment = namespace("environment");

@Component
export default class AedEventCompletedTime extends Vue {
  @aedProblemsInfo.State completedTime!: string;
  @environment.State locale!: string;
}
</script>

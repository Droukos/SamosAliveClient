<template>
  <span v-text="$helper.convDate2(completedTime, 'long', locale)" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const environment = namespace("environment");

@Component
export default class AedEventCompletedTime extends Vue {
  @Prop() completedTime!: number[];
  @environment.State locale!: string;
}
</script>

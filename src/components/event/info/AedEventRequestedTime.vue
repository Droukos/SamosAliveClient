<template>
  <span v-text="$helper.convDate2(requestedTime, 'long', locale)" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const environment = namespace("environment");

@Component
export default class AedEventRequestedTime extends Vue {
  @Prop() requestedTime!: number[];
  @environment.State locale!: string;
}
</script>

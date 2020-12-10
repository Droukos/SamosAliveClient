<template>
  <span>{{ $helper.convDate2(requestedTime, "long", locale) }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const environment = namespace("environment");

@Component
export default class AedEventRequestedTim extends Vue {
  @Prop() requestedTime!: string;
  @environment.State locale!: string;
}
</script>

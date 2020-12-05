<template>
  <span>{{ username }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedEventInfo = namespace("aedEventInfo");

@Component
export default class AedEventOccurrenceType extends Vue {
  @aedEventInfo.State username!: string;
}
</script>

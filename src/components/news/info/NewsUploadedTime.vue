<template>
  <span v-text="$helper.convDate2(uploadedTime, 'long', locale)" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const environment = namespace("environment");

@Component
export default class NewsUploadedTime extends Vue {
  @Prop() uploadedTime!: number[];
  @environment.State locale!: string;
}
</script>

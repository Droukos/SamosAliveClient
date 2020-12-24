<template>
  <span v-text="$helper.convDate2(requestedTime, 'long', locale)" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedProblemsInfo = namespace("aedProblemsInfo");
const environment = namespace("environment");

@Component
export default class AedProblemsUploadedTime extends Vue {
  @aedProblemsInfo.State requestedTime!: string;
  @environment.State locale!: string;
}
</script>

<template>
  <span>{{ conclusion }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedProblemsInfo = namespace("aedProblemsInfo");
@Component
export default class AedEventUsername extends Vue {
  @aedProblemsInfo.State conclusion!: string;
}
</script>

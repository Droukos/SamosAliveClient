<template>
  <span v-text="body" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedProblemsInfo = namespace("aedProblemsInfo");

@Component
export default class AedProblemsBody extends Vue {
  @aedProblemsInfo.State body!: string;
}
</script>

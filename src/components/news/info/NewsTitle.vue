<template>
  <span>{{ newsTitle }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const newsSearchInfo = namespace("newsSearchInfo");

@Component
export default class NewsTitle extends Vue {
  @newsSearchInfo.State newsTitle!: string;
}
</script>

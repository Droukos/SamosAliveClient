<template>
  <span>{{ username }}</span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const newsSearchInfo = namespace("newsSearchInfo");

@Component
export default class NewsUsername extends Vue {
  @newsSearchInfo.State username!: string;
}
</script>

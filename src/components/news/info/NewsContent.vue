<template>
  <v-textarea v-model="content" disabled />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const newsSearchInfo = namespace("newsSearchInfo");

@Component
export default class NewsContent extends Vue {
  @newsSearchInfo.State content!: string;
}
</script>

<template>
  <span v-text="$helper.convDate2(uploadedTime, 'long', locale)" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const newsSearchInfo = namespace("newsSearchInfo");
const environment = namespace("environment");

@Component
export default class NewsUploadedTime extends Vue {
  @newsSearchInfo.State uploadedTime!: string;
  @environment.State locale!: string;
}
</script>

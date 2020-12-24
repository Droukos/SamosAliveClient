<template>
  <v-btn color="primary" dark @click="more(id)" v-text="$t('history.more')" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedProblemsInfo = namespace("aedProblemsInfo");

@Component
export default class AedProblemsInfoButton extends Vue {
  @aedProblemsInfo.State id!: string;
  more(id: string) {
    this.$router.push({
      name: "problemsMore",
      params: { eventID: id }
    });
  }
}
</script>

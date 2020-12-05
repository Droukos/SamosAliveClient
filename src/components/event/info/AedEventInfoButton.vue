<template>
  <v-btn
      color="primary"
      dark
      @click="more(id)"
      v-text="$t('history.more')"
  >
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const aedEventInfo = namespace("aedEventInfo");

@Component
export default class AedEventInfoButton extends Vue {
  @aedEventInfo.State id!: string;
  more(id: string) {
    this.$router.push({
      name: "eventMore",
      params: { eventID: id }
    });
  }
}
</script>

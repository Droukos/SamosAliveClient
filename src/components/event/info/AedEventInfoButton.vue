<template>
  <v-btn
    color="primary"
    dark
    @click="more(eventID)"
    v-text="$t('history.more')"
  >
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventInfoButton extends Vue {
  @Prop() eventID!: string;
  //@aedEventInfo.State id!: string;
  more(id: string) {
    this.$router.push({
      name: "eventMore",
      params: { eventID: id }
    });
  }
}
</script>

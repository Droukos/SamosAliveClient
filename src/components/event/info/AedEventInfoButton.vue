<template>
  <v-btn
    color="primary"
    dark
    @click="more(eventID)"
    v-text="$t('history.more')"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AedEventInfoButton extends Vue {
  @Prop() eventID!: string;
  @Prop() nextRoute!: string;

  more(id: string) {
    this.$router.push({
      name: this.nextRoute,
      params: { eventID: id }
    });
  }
}
</script>

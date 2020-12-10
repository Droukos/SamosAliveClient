<template>
  <v-btn
    href="#"
    color="primary"
    v-text="$t('events.event')"
    @click="setDialog(true)"
    aria-label="setDialog"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const aedEventCreate = namespace("aedEventCreate");

@Component
export default class AedEventDialogOpen extends Vue {
  @aedEventCreate.State dialog!: boolean;
  @aedEventCreate.Mutation setDialog!: (dialog: boolean) => void;
}
</script>

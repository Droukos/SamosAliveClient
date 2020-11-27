<template>
  <v-list-item color="rgba(0, 0, 0, .4)">
    <v-list-item-content>
      <v-list-item-subtitle>
        <AedDeviceModelName class="pr-3" />
        <AedDeviceStatusChip v-if="$vuetify.breakpoint.xs" />
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <v-card outlined rounded>
          <AedDeviceModelDescription />
        </v-card>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    AedDeviceStatusChip: () =>
      import(
        /* webpackChunkName: "AedDeviceStatusChip" */ "@/components/device/aed/info/AedDeviceStatusChip.vue"
      ),
    AedDeviceModelName: () =>
      import(
        /* webpackChunkName: "AedDeviceModelName" */ "@/components/device/aed/info/AedDeviceModelName.vue"
      ),
    AedDeviceModelDescription: () =>
      import(
        /* webpackChunkName: "AedDeviceModelDescription" */ "@/components/device/aed/info/AedDeviceModelDescription.vue"
      )
  }
})
export default class AedDeviceModelInfo extends Vue {}
</script>

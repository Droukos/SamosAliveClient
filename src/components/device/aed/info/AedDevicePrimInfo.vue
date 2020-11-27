<template>
  <v-list-item color="rgba(0, 0, 0, .4)">
    <v-list-item-content>
      <div class="d-flex flex-row">
        <AedDeviceNickname class="font-weight-bold" />
        <v-spacer />
        <AedDeviceStatusChip v-if="!$vuetify.breakpoint.xs" />
        <AedDeviceOptions />
      </div>
      <v-list-item-subtitle v-if="!$vuetify.breakpoint.xs">
        <AedDeviceModelName />
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="!$vuetify.breakpoint.xs">
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
    AedDeviceNickname: () =>
      import(
        /* webpackChunkName: "AedDeviceNickname" */ "@/components/device/aed/info/AedDeviceNickname.vue"
      ),
    AedDeviceOptions: () =>
      import(
        /* webpackChunkName: "AedDeviceOptions" */ "@/components/device/aed/info/AedDeviceOptions.vue"
      ),
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
export default class AedDevicePrimInfo extends Vue {}
</script>

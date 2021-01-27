<template>
  <v-main>
    <v-sheet>
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        :loading="loading"
        :transition="transition"
        type="card"
      >
        <v-card class="mx-auto" max-width="934" outlined>
          <v-container>
            <v-sheet v-if="!this.$vuetify.breakpoint.xs">
              <div class="d-flex flex-row align-start">
                <AedDevicePic :size="190" :url="picUrl" />
                <AedDevicePrimInfo />
              </div>
              <AedDeviceAddress />
            </v-sheet>
            <v-sheet v-else class="flex-column mb-6">
              <AedDevicePrimInfo />
              <div class="d-flex flex-row align-start">
                <AedDevicePic :size="160" :url="picUrl" />
                <AedDeviceModelInfo />
              </div>
              <AedDeviceAddress />
            </v-sheet>
          </v-container>
        </v-card>
      </v-skeleton-loader>
    </v-sheet>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AedDeviceInfoMod from "@/store/modules/dynamic/aed/device/aed-device-info";
import { namespace } from "vuex-class";
import { IAedDeviceInfo } from "@/types/aed-device";

const aedDeviceInfo = namespace("aedDeviceInfo");

@Component({
  components: {
    AedDevicePic: () =>
      import(
        /* webpackChunkName: "AedDevicePic" */ "@/components/device/aed/info/AedDevicePic.vue"
      ),
    AedDevicePrimInfo: () =>
      import(
        /* webpackChunkName: "AedDevicePrimInfo" */ "@/components/device/aed/info/AedDevicePrimInfo.vue"
      ),
    AedDeviceModelInfo: () =>
      import(
        /* webpackChunkName: "AedDeviceModelInfo" */ "@/components/device/aed/info/AedDeviceModelInfo.vue"
      ),
    AedDeviceAddress: () =>
      import(
        /* webpackChunkName: "AedDeviceAddress" */ "@/components/device/aed/info/AedDeviceAddressInfo.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const aedDeviceInfoCard = vm as AedDeviceInfoCard;
      const store = aedDeviceInfoCard.$store;
      if (!(store && store.state && store.state["aedDeviceInfo"])) {
        store.registerModule("aedDeviceInfo", AedDeviceInfoMod);
      }
      aedDeviceInfoCard.fetchAedDeviceInfo(to.params.aedDeviceId).then(() => {
        aedDeviceInfoCard.loading = false;
      });
    });
  },
  beforeDestroy() {
    //this.$store.unregisterModule("aedDeviceInfo");
  }
})
export default class AedDeviceInfoCard extends Vue {
  loading = true;
  transition = "scale-transition";
  @aedDeviceInfo.State picUrl!: string;
  @aedDeviceInfo.Action fetchAedDeviceInfo!: (
    aedDeviceId: string
  ) => Promise<IAedDeviceInfo>;
}
</script>

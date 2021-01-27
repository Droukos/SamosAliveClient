<template>
  <v-main>
    <v-sheet>
      <v-container>
        <h2 v-text="$t('device.editTitle')" />
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          :loading="loading"
          :transition="transition"
          type="card"
        >
          <v-card outlined>
            <DAedEditModelNameInputBase />
            <DAedEditModelDescriptionInputBase />
            <DAedEditDeviceFileInputBase class="mb-3" />
            <DAedAddressFileInputBase class="mb-3" />
            <DAedAddressNameInputBase />

            <div
              :style="
                'height:' + ($vuetify.breakpoint.mdAndUp ? '600px' : '300px')
              "
            >
              <l-map :zoom="zoom" :center="center" style="z-index: 0;">
                <LTileLayerBase />
                <LMarkerRedSimple :marker="marker" />
              </l-map>
            </div>
            <v-btn
              block
              rounded
              v-if="showUpload"
              class="deep-purple darken-2"
              style="color:white;"
              @click="updateAedDevice()"
              aria-label="AedCreate"
              v-text="$t('edit.update')"
            />
            <span
              v-if="showUpdatedAedDevice"
              class="green--text text--darken-2"
              v-text="$t('edit.updated')"
            />
            <span
              v-if="showErrorUpdatedAedDevice"
              class="red--text text--darken-2"
              v-text="$t('edit.errorUpdated')"
            />
          </v-card>
        </v-skeleton-loader>
      </v-container>
    </v-sheet>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AedDeviceInfoMod from "@/store/modules/dynamic/aed/device/aed-device-info";
import AedDeviceEditMod from "@/store/modules/dynamic/aed/device/aed-device-edit";
import { IAedDeviceInfo } from "@/types/aed-device";
import { namespace } from "vuex-class";
import { LControl, LMap } from "vue2-leaflet";
import L from "leaflet";

const aedDeviceInfo = namespace("aedDeviceInfo");
const aedDeviceEdit = namespace("aedDeviceEdit");

@Component({
  components: {
    LMap,
    LControl,
    DAedEditModelNameInputBase: () =>
      import(
        /* webpackChunkName: "DAedEditModelNameInputBase" */ "@/components/device/aed/edit/DAedEditModelNameInputBase.vue"
      ),
    DAedEditModelDescriptionInputBase: () =>
      import(
        /* webpackChunkName: "DAedEditModelDescriptionInputBase" */ "@/components/device/aed/edit/DAedEditModelDescriptionInputBase.vue"
      ),
    DAedAddressNameInputBase: () =>
      import(
        /* webpackChunkName: "DAedAddressNameInputBase" */ "@/components/device/aed/edit/DAedAddressNameInputBase.vue"
      ),
    DAedAddressFileInputBase: () =>
      import(
        /* webpackChunkName: "DAedAddressFileInputBase" */ "@/components/device/aed/edit/DAedAddressFileInputBase.vue"
      ),
    DAedEditDeviceFileInputBase: () =>
      import(
        /* webpackChunkName: "DAedEditDeviceFileInputBase" */ "@/components/device/aed/edit/DAedEditDeviceFileInputBase.vue"
      ),
    LTileLayerBase: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/map/LTileLayerBase.vue"
      ),
    LMarkerRedSimple: () =>
      import(
        /* webpackChunkName: "LMarkerRedSimple" */ "@/components/map/LMarkerRedSimple.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const aedDeviceEditCard = vm as AedDeviceEditCard;
      const store = aedDeviceEditCard.$store;
      if (!(store && store.state && store.state["aedDeviceInfo"])) {
        store.registerModule("aedDeviceInfo", AedDeviceInfoMod);
      }
      if (!(store && store.state && store.state["aedDeviceEdit"])) {
        store.registerModule("aedDeviceEdit", AedDeviceEditMod);
      }
      aedDeviceEditCard.fetchAedDeviceInfo(to.params.aedDeviceId).then(data => {
        aedDeviceEditCard.setEditAedDeviceInfo(data);
        aedDeviceEditCard.loading = false;
      });
    });
  },
  beforeDestroy() {
    //this.$store.unregisterModule("aedDeviceEdit");
  }
})
export default class AedDeviceEditCard extends Vue {
  loading = true;
  transition = "scale-transition";
  @aedDeviceEdit.State zoom!: number;
  @aedDeviceEdit.State center!: L.LatLng;
  @aedDeviceEdit.State marker!: L.LatLng;
  @aedDeviceEdit.State showUpload!: boolean;
  @aedDeviceEdit.State showUpdatedAedDevice!: boolean;
  @aedDeviceEdit.State showErrorUpdatedAedDevice!: boolean;

  @aedDeviceEdit.Mutation setEditAedDeviceInfo!: (data: IAedDeviceInfo) => void;
  @aedDeviceEdit.Action updateAedDevice!: () => Promise<boolean>;
  @aedDeviceInfo.Action fetchAedDeviceInfo!: (
    aedDeviceId: string
  ) => Promise<IAedDeviceInfo>;
}
</script>

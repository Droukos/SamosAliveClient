<template>
  <div>
    <div class="d-flex flex-row">
      <div class="d-flex flex-column">
        <v-card outlined>
          <span
            class="subtitle-1"
            v-text="$t('device-register.addr') + ': ' + address"
          />
        </v-card>
      </div>
      <v-spacer />
      <AedDevicePic :size="190" :url="addressPicUrl" />
    </div>
    <span class="subtitle-1">{{ $t("device-register.addrOnMap") }}</span>
    <div :style="'height:' + ($vuetify.breakpoint.mdAndUp ? '600px' : '300px')">
      <LMap :zoom="zoom" :center="center" style="z-index: 0;">
        <LTileLayerBase />
        <LMarkerAedDeviceHeart :marker="marker" />
      </LMap>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { LControl, LMap } from "vue2-leaflet";
import { LatLng } from "leaflet";

const aedDeviceInfo = namespace("aedDeviceInfo");

@Component({
  components: {
    LMap,
    LControl,
    AedDevicePic: () =>
      import(
        /* webpackChunkName: "AedDevicePic" */ "@/components/device/aed/info/AedDevicePic.vue"
      ),
    LTileLayerBase: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/map/LTileLayerBase.vue"
      ),
    LMarkerAedDeviceHeart: () =>
      import(
        /* webpackChunkName: "LMarkerAedDeviceHeart" */ "@/components/map/LMarkerAedDeviceHeart.vue"
      )
  }
})
export default class AedDeviceAddress extends Vue {
  @aedDeviceInfo.State addressPicUrl!: string;
  @aedDeviceInfo.State address!: string;
  @aedDeviceInfo.State zoom!: number;
  @aedDeviceInfo.State center!: LatLng;
  @aedDeviceInfo.State marker!: LatLng;
}
</script>

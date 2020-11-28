<template>
  <v-content>
    <v-card>
      <v-container>
        <h2>{{ $t("device-register.title") }}</h2>
        <v-spacer />
        <NicknameInputBase />
        <ModelNameInputBase />
        <ModelDescriptionInputBase />

        <AedDeviceFileInputBase class="mb-3" />
        <AedAddressFileInputBase class="mb-3" />
        <AddressNameInputBase />

        <div
          :style="'height:' + ($vuetify.breakpoint.mdAndUp ? '600px' : '300px')"
        >
          <l-map :zoom="zoom" :center="center" style="z-index: 0;">
            <LTileLayerBase />
            <!--<l-control position="topright">
              <v-btn @click="alert('he')"></v-btn>
            </l-control>-->
            <LMarkerRedSimple :marker="marker" />
          </l-map>
        </div>
      </v-container>
      <v-btn
        v-if="createVisible"
        block
        rounded
        class="deep-purple darken-2"
        style="color:white;"
        @click="createAedDevice()"
        aria-label="AedCreate"
      >
        {{ $t("forms.create") }}
      </v-btn>
      <span v-if="showError" :class="errorClass">{{
        $t("edit.errorUpdated")
      }}</span>
    </v-card>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import aedDeviceRegisterMod from "@/store/modules/dynamic/aed/device/aed-device-register";
import { LMap, LControl } from "vue2-leaflet";
import L from "leaflet";
import { namespace } from "vuex-class";

const aedDeviceRegister = namespace("aedDeviceRegister");

@Component({
  components: {
    LMap,
    LControl,
    LTileLayerBase: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/map/LTileLayerBase.vue"
      ),
    LMarkerRedSimple: () =>
      import(
        /* webpackChunkName: "LMarkerRedSimple" */ "@/components/map/LMarkerRedSimple.vue"
      ),
    LGeoSearch: () =>
      import(
        /* webpackChunkName: "LGeoSearch" */ "@/components/map/LGeoSearch.vue"
      ),
    NicknameInputBase: () =>
      import(
        /* webpackChunkName: "NicknameInputBase" */ "@/components/device/aed/register/NicknameInputBase.vue"
      ),
    ModelNameInputBase: () =>
      import(
        /* webpackChunkName: "ModelNameInputBase" */ "@/components/device/aed/register/ModelNameInputBase.vue"
      ),
    ModelDescriptionInputBase: () =>
      import(
        /* webpackChunkName: "ModelDescriptionInputBase" */ "@/components/device/aed/register/ModelDescriptionInputBase.vue"
      ),
    AddressNameInputBase: () =>
      import(
        /* webpackChunkName: "AddressNameInputBase" */ "@/components/device/aed/register/AddressNameInputBase.vue"
      ),
    AedAddressFileInputBase: () =>
      import(
        /* webpackChunkName: "AedAddressFileInputBase" */ "@/components/device/aed/register/AedAddressFileInputBase.vue"
      ),
    AedDeviceFileInputBase: () =>
      import(
        /* webpackChunkName: "AedDeviceFileInputBase" */ "@/components/device/aed/register/AedDeviceFileInputBase.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const registerAedDeviceCard = vm as RegisterAedDeviceCard;
      const store = registerAedDeviceCard.$store;
      if (!(store && store.state && store.state["aedDeviceRegister"])) {
        store.registerModule("aedDeviceRegister", aedDeviceRegisterMod);
      }
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("aedDeviceRegister");
  }
})
export default class RegisterAedDeviceCard extends Vue {
  @aedDeviceRegister.State zoom!: number;
  @aedDeviceRegister.State center!: L.LatLng;
  @aedDeviceRegister.State marker!: L.LatLng;
  @aedDeviceRegister.State createVisible!: boolean;
  @aedDeviceRegister.Action registerAedDevice!: () => Promise<string>;

  showError = false;
  errorClass = "red--text text--lighten-1 pl-3";

  createAedDevice() {
    this.registerAedDevice()
      .then(value =>
        this.$router.push({
          name: "aedDeviceInfo",
          params: {
            aedDeviceId: value
          }
        })
      )
      .catch(() => (this.showError = true));
  }
}
</script>

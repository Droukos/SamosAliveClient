<template>
  <l-control position="topright">
    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          <v-icon v-text="'$livePr'" />
        </v-btn>
      </template>
      <v-card width="350">
        <v-container>
          <SearchGoToLatLng />
          <SearchCircusRadiusSlider />

          <v-divider />
          <div v-if="validToSearch" class="d-flex flex-row">
            <v-spacer />
            <v-btn
              @click="fetchAedDeviceInAreaPreview"
              v-text="$t('search.title')"
            />
          </div>
        </v-container>
      </v-card>
    </v-menu>
  </l-control>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LControl } from "vue2-leaflet";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component({
  components: {
    LControl,
    SearchCircusRadiusSlider: () =>
      import(
        /* webpackChunkName: "SearchCircusRadiusSlider" */ "@/components/map/controls/SearchCircusRadiusSlider.vue"
      ),
    SearchGoToLatLng: () =>
      import(
        /* webpackChunkName: "SearchGoToLatLng" */ "@/components/map/controls/SearchGoToLatLng.vue"
      )
  }
})
export default class SearchableMenu extends Vue {
  @search.State validToSearch!: boolean;
  @search.Action fetchAedDeviceInAreaPreview!: () => void;
}
</script>

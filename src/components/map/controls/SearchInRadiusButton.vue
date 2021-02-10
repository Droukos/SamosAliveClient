<template>
  <v-card>
    <SearchCircusRadiusSlider />
    <v-divider />
    <div v-if="validToSearch" class="d-flex flex-row">
      <v-spacer />
      <v-btn
        @click="fetchAedDeviceInAreaAvailablePreview"
        v-text="$t('search.title')"
      />
    </div>
  </v-card>
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
  @search.Action fetchAedDeviceInAreaAvailablePreview!: () => void;
}
</script>

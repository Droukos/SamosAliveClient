<template>
  <LTileLayer :url="url" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LTileLayer } from "vue2-leaflet";

@Component({
  components: {
    LTileLayer
  }
})
export default class LTileLayerBase extends Vue {
  url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
}
</script>

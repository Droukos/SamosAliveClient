<template>
  <div></div>
</template>

<script>
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
export default {
  props: {
    options: {
      //required: true
    }
  },
  name: "l-geo-search",
  mounted() {
    this.add();
  },
  beforeDestroy() {
    this.remove();
  },
  methods: {
    deferredMountedTo(parent) {
      const searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider()
      });
      parent.addControl(searchControl);
      searchControl.getContainer().onclick = e => {
        e.stopPropagation();
      };
    },
    remove() {
      if (this.markerCluster) {
        this.$parent.removeLayer(this.markerCluster);
      }
    },
    add() {
      if (this.$parent._isMounted) {
        this.deferredMountedTo(this.$parent.mapObject);
      }
    }
  }
};
</script>

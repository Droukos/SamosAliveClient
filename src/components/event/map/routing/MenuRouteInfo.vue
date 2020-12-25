<template>
  <VMenu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">
        <v-icon v-text="'$mapDirections'" />
      </v-btn>
    </template>
    <v-card width="350" max-height="400" class="overflow-y-auto">
      <v-list>
        <v-list-item
          v-for="instruction in routeInfo.instructions"
          :key="instruction.index"
          dense
        >
          <v-alert outlined width="350">
            <div>
              <span>
                <v-icon
                  v-text="
                    getDirectionIcon(instruction.type, instruction.modifier)
                  "
                />
                {{ instruction.text }}
              </span>
              <v-divider />
              <div class="d-flex flex-column">
                <span
                  class="subtitle-1"
                  v-text="
                    $t('routing.distance') +
                      getFormattedDistance(instruction.distance)
                  "
                />
                <span
                  class="subtitle-1"
                  v-text="
                    $t('routing.duration') + getFormattedTime(instruction.time)
                  "
                />
              </div>
            </div>
          </v-alert>
        </v-list-item>
      </v-list>
    </v-card>
  </VMenu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LControl } from "vue2-leaflet";
import humanizeDuration from "humanize-duration";
import { directionIcon, formatDistance } from "@/plugins/geolocation/osrm";
import { namespace } from "vuex-class";
import { RouteInfo } from "@/types/osm";

const environment = namespace("environment");

@Component({
  components: {
    LControl
  }
})
export default class LControlRouteInfo extends Vue {
  @environment.State locale!: string;
  @Prop() routeInfo!: RouteInfo;

  getFormattedTime(duration: number) {
    return humanizeDuration(duration * 1000, { language: this.locale });
  }

  getDirectionIcon(type: string, modifier: string) {
    return directionIcon(type, modifier);
  }

  getFormattedDistance(distance: number) {
    return formatDistance(distance, this.locale);
  }
}
</script>

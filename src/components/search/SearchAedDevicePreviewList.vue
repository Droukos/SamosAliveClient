<template>
  <v-card>
    <v-list three-line>
      <v-list-item
        v-for="item in previewAedDevices"
        :key="item.id"
        @click="goToAedDevice(item.id)"
      >
        <AedDevicePreviewInfo :aedDevicePreviewInfo="item" />
        <!--<v-list-item-avatar :size="70">
          <AedDevicePic :size="70" :url="item.picUrl" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <div class="d-flex flex-row">
              <p class="pr-2" style="font-weight: bold;">
                {{ $t("device.nickname") + ": " + item.uniqueNickname }}
              </p>
            </div>
          </v-list-item-title>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <p
                class="grey--text text--darken-1"
                v-bind="attrs"
                v-on="on"
                style="font-size:16px;"
              >
                {{ $t("device.modelName") + ": " + item.modelName }}
              </p>
            </template>
            <div class="d-flex flex-column">
              <span>{{ $t("device.modelDesc") + ":" }}</span>
              <span>{{ item.description }}</span>
            </div>
          </v-tooltip>
          <p class="grey--text text--darken-1" style="font-size:16px;">
            {{ $t("device-register.addr") + ": " + item.address }}
          </p>
          <p :class="getStatusColor(item.status)" style="font-size:16px;">
            {{ $t("aed-device-status." + item.status) }}
          </p>
        </v-list-item-content>-->
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IAedDevPreview } from "@/types/aed-device";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component({
  components: {
    AedDevicePreviewInfo: () =>
      import(
        /* webpackChunkName: "AedDevicePreviewInfo" */ "@/components/device/aed/info/AedDevicePreviewInfo.vue"
      )
  }
})
export default class SearchAedDevicePreviewList extends Vue {
  @search.State previewAedDevices!: IAedDevPreview[];

  //getStatusColor(statusCode: number) {
  //  return getAedDeviceStatusColor(statusCode);
  //}

  goToAedDevice(aedDeviceId: string) {
    this.$router.push({
      name: "aedDeviceInfo",
      params: {
        aedDeviceId: aedDeviceId
      }
    });
  }
}
</script>

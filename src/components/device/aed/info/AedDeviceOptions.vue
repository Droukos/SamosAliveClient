<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-btn rounded v-on="on" aria-label="MoreOptions">
        {{ $t("device.deviceOptions") }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="item in moreOptions"
        :key="item.index"
        @click="optionClicked(item)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TranslateResult } from "vue-i18n";
import { aedDeviceOptions } from "@/plugins/enums/device/aed/aed-device-options";
import { namespace } from "vuex-class";

const aedDeviceInfo = namespace("aedDeviceInfo");

@Component
export default class AedDeviceOptions extends Vue {
  @aedDeviceInfo.State id!: string;

  optionClicked(item: { index: number; title: TranslateResult }) {
    if (item.index == 2) {
      this.$router.push({
        name: "aedDeviceEdit",
        params: {
          aedDeviceId: this.id
        }
      });
    }
  }

  get moreOptions() {
    return [
      {
        index: aedDeviceOptions.EDIT,
        title: this.$t("device.deviceEdit")
      }
    ];
  }
}
</script>

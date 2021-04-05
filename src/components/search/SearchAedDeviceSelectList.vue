<template>
  <v-card>
    <span>{{ $t("problems.selectedDev") + ": " + selected }}</span>
    <v-list three-line>
      <v-list-item
        v-for="item in previewAedDevices"
        :key="item.id"
        @click="selectAedDevice(item.id, item.uniqueNickname)"
      >
        <AedDevicePreviewInfo :aedDevicePreviewInfo="item" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AedDevPreview } from "@/types/aed-device";
import { namespace } from "vuex-class";

const search = namespace("search");
const aedProblemsCreate = namespace("aedProblemsCreate");

@Component({
  components: {
    AedDevicePreviewInfo: () =>
      import(
        /* webpackChunkName: "AedDevicePreviewInfo" */ "@/components/device/aed/info/AedDevicePreviewInfo.vue"
      )
  }
})
export default class SearchAedDevicePreviewList extends Vue {
  selected = "";

  @search.State previewAedDevices!: AedDevPreview[];
  @aedProblemsCreate.Mutation setAedDeviceId!: (aedDeviceId: string) => void;
  @aedProblemsCreate.Mutation setSuccessSubmit!: (bool: boolean) => void;
  @aedProblemsCreate.Action vForm!: () => void;

  selectAedDevice(aedDeviceId: string, name: string) {
    this.setSuccessSubmit(false);
    this.selected = name;
    this.setAedDeviceId(aedDeviceId);
    this.vForm();
  }
}
</script>

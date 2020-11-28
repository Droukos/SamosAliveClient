<template>
  <v-combobox
    v-model="fAddress.v"
    :items="fAddress.hint"
    @input="updateAddressValue"
    :search-input.sync="search"
    :label="fAddress.f"
    :error-messages="fAddress.e"
    item-text="label"
    item-value="label"
    outlined
    dense
    :counter="150"
  ></v-combobox>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { AddressObject, OpenStreetObjData } from "@/types";
import debounce from "@/plugins/helpers/debounce";
import { namespace } from "vuex-class";

const aedDeviceInfo = namespace("aedDeviceInfo");
const aedDeviceEdit = namespace("aedDeviceEdit");

@Component
export default class DAedAddressNameInputBase extends Vue {
  @aedDeviceEdit.State fAddress!: AddressObject;
  @aedDeviceInfo.State address!: string;
  @aedDeviceEdit.Mutation addressValueChange!: (
    value: OpenStreetObjData
  ) => void;
  @aedDeviceEdit.Action callOpenStreetApi!: (queryAddress: string) => void;
  @aedDeviceEdit.Action vForm!: () => void;
  search = "";

  @Watch("search")
  searchInput(val: string) {
    if (!val) {
      return;
    }
    this.searchAddress();
  }

  searchAddress = debounce(() => this.fetchAddresses(), 700);
  updateAddressValue() {
    if (typeof this.fAddress.v === "object" && this.fAddress.v !== null) {
      this.addressValueChange(this.fAddress.v);
      //if (this.fAddress.v.label == this.address) {
      //  this.fAddress.e = this.$t("edit.sameInput");
      //}
      this.vForm();
    }
  }
  validateAndCheckForm() {
    this.vForm();
  }

  async fetchAddresses() {
    this.callOpenStreetApi(this.search);
  }
}
</script>

<template>
  <v-combobox
    v-model="fAddress.v"
    :items="fAddress.hint"
    @input="updateAddressValue"
    :search-input.sync="search"
    :label="fAddress.f"
    item-text="label"
    item-value="label"
    outlined
    dense
  ></v-combobox>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import debounce from "@/plugins/helpers/debounce";
import { AddressObject, OpenStreetObjData } from "@/types";

const aedEventAddress = namespace("aedEventAddress");

@Component
export default class AddressNameInputBase extends Vue {
  @aedEventAddress.State fAddress!: AddressObject;
  @aedEventAddress.Mutation addressValueChange!: (
    value: OpenStreetObjData
  ) => void;
  @aedEventAddress.Action callOpenStreetApi!: (queryAddress: string) => void;
  @aedEventAddress.Action vForm!: () => void;
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

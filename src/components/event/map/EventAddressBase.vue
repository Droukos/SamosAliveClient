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
  />
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import debounce from "@/plugins/helpers/debounce";
import { AddressObject, OpenStreetObjData } from "@/types";

const aedEventCreate = namespace("aedEventCreate");

@Component
export default class AddressNameInputBase extends Vue {
  @aedEventCreate.State fAddress!: AddressObject;
  @aedEventCreate.Mutation addressValueChange!: (
    value: OpenStreetObjData
  ) => void;
  @aedEventCreate.Action callOpenStreetApi!: (queryAddress: string) => void;
  @aedEventCreate.Action vForm!: () => void;
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

<template>
  <v-expansion-panels popout class="mb-6">
    <v-expansion-panel>
      <v-expansion-panel-header expand-icon="mdi-menu-down">
        <p class="headline">
          {{ $t("fields.address") }} {{ "(" + $t("edit.optional") + ")" }}
        </p>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-autocomplete
          v-model="selectedCountry"
          :items="queryCountries"
          :search-input.sync="search"
          :loading="loading"
          cache-items
          chips
          clearable
          outlined
          item-text="name"
          item-value="code"
          :label="$t('edit.countryHint')"
        >
          <template v-slot:item="data">
            <v-list-item-avatar
              color="indigo"
              class="headline font-weight-light white--text"
              >{{ data.item.code }}</v-list-item-avatar
            >
            <v-list-item-content>
              <v-list-item-title v-text="data.item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-img :src="countryFlag(data.item.code)"></v-img>
            </v-list-item-action>
          </template>
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="countrySelected(data)"
              color="blue-grey"
              class="white--text"
            >
              <v-img :src="countryFlag(data.item.code)"></v-img>
              <span class="pl-1" v-text="data.item.name"></span>
            </v-chip>
          </template>
        </v-autocomplete>
        <v-text-field
          v-model="fProvince.v"
          @input="onChangeInput()"
          :counter="30"
          :label="$t('fields.province')"
        />
        <v-text-field
          v-model="fCity.v"
          @input="onChangeInput()"
          :counter="30"
          :label="$t('fields.city')"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { countries, getCountry } from "@/plugins/helpers/countries";
import { Country, FieldObject } from "@/types";
import { namespace } from "vuex-class";

const editProfileModule = namespace("editProfile");

@Component({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const addrInputBase = vm as AddressInputBase;
      addrInputBase.queryCountries = getCountry(addrInputBase.fCountryCode.v);
    });
  }
})
export default class AddressInputBase extends Vue {
  selectedCountry: Country = {
    code: "GR",
    name: "Greece"
  };
  search = "";
  loading = false;
  queryCountries: Array<Country> = [];

  @editProfileModule.State fCountryCode!: FieldObject;
  @editProfileModule.State fProvince!: FieldObject;
  @editProfileModule.State fCity!: FieldObject;
  @editProfileModule.Action vForm!: () => void;

  onChangeInput() {
    this.vForm();
  }

  countryFlag(countryCode: string) {
    return "https://www.countryflags.io/".concat(countryCode, "/flat/32.png");
  }

  countrySelected(data: { selected: Country }) {
    console.log(data);
    this.fCountryCode.v = data.selected.code;
    return data.selected;
  }

  querySelections(cIso: string) {
    this.loading = true;
    setTimeout(() => {
      this.queryCountries = countries.filter(e => {
        return (
          (e.name || "").toLowerCase().indexOf((cIso || "").toLowerCase()) > -1
        );
      });
      this.loading = false;
    }, 800);
  }

  @Watch("search")
  searchChange(cIso: string) {
    cIso && cIso !== this.fCountryCode.v && this.querySelections(cIso);
  }
}
</script>

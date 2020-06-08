<template>
  <v-expansion-panels popout class="mb-6">
    <v-expansion-panel>
      <v-expansion-panel-header expand-icon="mdi-menu-down">
        <p class="headline">{{$t('fields.address')}} {{'('+$t('edit.optional')+')'}}</p>
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
          :label="$t('edit.country_hint')"
        >
          <template v-slot:item="data">
            <v-list-item-avatar
              color="indigo"
              class="headline font-weight-light white--text"
            >{{ data.item.code }}</v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text=" data.item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-img :src="country(data.item.code)"></v-img>
            </v-list-item-action>
          </template>
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="countrySelected(data)"
              color="blue-grey"
              class="white--text"
            >
              <v-img :src="country(data.item.code)"></v-img>
              <span class="pl-1" v-text="data.item.name"></span>
            </v-chip>
          </template>
        </v-autocomplete>
        <v-text-field v-model="editForm.province" @input="onChangeInput()" :counter="30" :label="$t('fields.province')"></v-text-field>
        <v-text-field v-model="editForm.city" @input="onChangeInput()"  :counter="30" :label="$t('fields.city')"></v-text-field>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import countries from "../../helpers/countries.js";

export default {
  data: function() {
    return {
      queryCountries: [],
      selectedCountry: { code: "GR", name: "Greece" },
      search: null,
      loading: false
    };
  },
  props: ["editForm", "onChange"],
  methods: {
    onChangeInput(){
        this.onChange();
    },
    country: function(country_code) {
      return "https://www.countryflags.io/".concat(country_code, "/flat/32.png");
    },
    countrySelected(data) {
        console.log(data);
        return data.selected;
    },
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.queryCountries = this.$countries.filter(e => { 
            return ((e.name || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1);});
        this.loading = false;
      }, 800);
    }
  },
  watch: {
    search(val) {
      val && val !== this.editForm.country_code && this.querySelections(val);
    }
  }
};
</script>
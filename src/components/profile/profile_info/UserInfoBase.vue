<template>
  <v-list-item color="rgba(0, 0, 0, .4)">
    <v-list-item-content>
      <v-list-item-title class="title">{{
        $t("user.information")
      }}</v-list-item-title>
      <v-list-item-subtitle v-if="showEmail"
        >{{ $t("fields.email") + ": " }}{{ email }}</v-list-item-subtitle
      >
      <v-list-item-subtitle v-if="showAddress"
        >{{ $t("fields.address") + ": " }}
        <div class="d-flex flex-row">
          <span class="pr-1"
            ><v-img :src="getCountryImage" max-width="22"></v-img
          ></span>
          <span>{{ address }}</span>
        </div>
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="showPhone"
        >{{ $t("fields.phone") + ": " }}{{ phone }}</v-list-item-subtitle
      >
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const profile = namespace("profile");

@Component
export default class UserInfoBase extends Vue {
  @profile.State public phone: string[] | undefined;
  @profile.State public country_code!: string | undefined;
  @profile.State public address!: string | undefined;
  @profile.State public email!: string;
  @profile.State public showPhone!: boolean;
  @profile.State public showAddress!: boolean;
  @profile.State public showEmail!: boolean;

  getCountryImage() {
    return this.country_code == undefined
      ? ""
      : "https://www.countryflags.io/".concat(
          this.country_code,
          "/flat/32.png"
        );
  }
}
</script>

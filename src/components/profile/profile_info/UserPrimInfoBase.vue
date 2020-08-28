<template>
  <v-list-item color="rgba(0, 0, 0, .4)">
    <v-list-item-content>
      <v-list-item-title class="title">{{ username }}</v-list-item-title>
      <v-list-item-subtitle>{{ name }} {{ surname }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn rounded v-on="on" aria-label="MoreOptions">
            {{ $t("user.moreOptions") }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in moreOptions"
            :key="index"
            @click="optionClicked(item)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { TranslateResult } from "vue-i18n";
const profile = namespace("profile");

@Component
export default class UserPrimInfoBase extends Vue {
  @profile.State userid!: string;
  @profile.State username!: string;
  @profile.State name!: string;
  @profile.State surname!: string;
  @Prop() public moreOptions!: Array<{ index: number; title: TranslateResult }>;

  optionClicked(item: { index: number; title: TranslateResult }) {
    if (item.index == 2) {
      this.$router.push({
        name: "userEditProfile",
        params: {
          userID: this.userid
        }
      });
    }
  }
}
</script>

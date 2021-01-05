<template>
  <v-container fluid>
    <v-checkbox v-model="Tag" label="AED" value="1" v-on:change="choose(Tag)">
    </v-checkbox>
    <v-checkbox v-model="Tag" label="HEALTH" value="2" v-on:change="choose(Tag)">
    </v-checkbox>
    <v-checkbox v-model="Tag" label="SAMOS" value="3" v-on:change="choose(Tag)">
    </v-checkbox>
    <v-checkbox v-model="Tag" label="OTHER" value="4" v-on:change="choose(Tag)">
    </v-checkbox>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const newsCreate = namespace("newsCreate");

@Component
export default class NewsContentInput extends Vue {
  Tag = [];
  @newsCreate.Action vForm!: () => void;
  @newsCreate.Mutation setTags!: (tag: number[]) => void;
  //items: [
  //  { name: "Foo"; value: 1 },
  //  { name: "Bar"; value: 2 },
  //  { name: "Bar"; value: 3 },
  //  { name: "Bar"; value: 4 }
  //];

  choose(tag: number[]) {
    this.setTags(tag);
  }
  validateAndCheckForm() {
    this.vForm();
  }
}
</script>

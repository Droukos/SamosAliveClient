<template>
  <v-container fluid>
    <v-select
      v-model="Tag"
      :items="tags"
      item-value="tag"
      item-text="name"
      label="Tags"
      multiple
      v-on:change="choose(Tag)"
    />
    <!--<v-checkbox v-model="Tag" label="AED" value="1" v-on:change="choose(Tag)">
    </v-checkbox>
    <v-checkbox
      v-model="Tag"
      label="HEALTH"
      value="2"
      v-on:change="choose(Tag)"
    >
    </v-checkbox>
    <v-checkbox v-model="Tag" label="SAMOS" value="3" v-on:change="choose(Tag)">
    </v-checkbox>
    <v-checkbox v-model="Tag" label="OTHER" value="4" v-on:change="choose(Tag)">
    </v-checkbox>-->
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const newsCreate = namespace("newsCreate");

@Component
export default class NewsContentInput extends Vue {
  Tag = [];
  tags = [
    {
      tag: 1,
      name: "AED"
    },
    {
      tag: 2,
      name: "HEALTH"
    },
    {
      tag: 3,
      name: "SAMOS"
    },
    {
      tag: 4,
      name: "OTHER"
    }
  ];
  @newsCreate.Action vForm!: () => void;
  @newsCreate.Mutation setTags!: (tag: number[]) => void;

  choose(tag: number[]) {
    this.setTags(tag);
    this.validateAndCheckForm();
  }
  validateAndCheckForm() {
    this.vForm();
  }
}
</script>

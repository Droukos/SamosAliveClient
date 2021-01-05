<template>
  <v-container fluid>
    <v-select
      v-model="Tag"
      :items="tags"
      item-value="tag"
      item-text="name"
      label="Tags"
      v-on:change="chooseTag()"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const newsList = namespace("newsList");

@Component
export default class NewsContentInput extends Vue {
  Tag = -1;
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

  @newsList.Mutation selectTag!: (tag: number) => void;

  chooseTag() {
    console.log(this.Tag);
    this.selectTag(this.Tag);
  }
}
</script>

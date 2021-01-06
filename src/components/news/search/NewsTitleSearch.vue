<template>
  <v-text-field
    color="indigo"
    v-model="model.search"
    :loading="model.isLoading"
    class="pt-1"
    :counter="model.counter"
    :label="model.label"
    @keyup="chooseTitle(model.search)"
    outlined
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const newsList = namespace("newsList");

@Component
export default class NewsSearch extends Vue {
  model = {
    search: "",
    isLoading: false,
    counter: 50,
    label: this.$t("news.search")
  };
  @newsList.Action selectTitle!: (title: string) => void;

  chooseTitle(title: string) {
    console.log(title);
    this.selectTitle(title);
  }
}
</script>

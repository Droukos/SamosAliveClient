<template>
  <div>
    <SubNavBackBtn />
    <v-list-item
      v-for="(item, index) in newsListOptions"
      :key="index"
      @click="to(index)"
    >
      <v-list-item-icon>
        <v-icon v-text="item.icon" />
      </v-list-item-icon>
      <v-list-item-title v-text="item.i18n" />
      <div v-if="item.rArrowIcon">
        <v-spacer />
        <v-icon v-text="'$chevRight'" />
      </div>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const environment = namespace("environment");

@Component({
  components: {
    SubNavBackBtn: () =>
      import(
        /* webpackChunkName: "SubNavBackBtn" */ "@/components/navbar/nav-utility/SubNavBackBtn.vue"
      )
  }
})
export default class NavProblemsList extends Vue {
  @environment.Getter subNavBavOpen!: number;

  to(index: number) {
    this.$router.push({
      name: this.newsListOptions[index].link
    });
  }

  get newsListOptions() {
    return [
      {
        index: 0,
        i18n: this.$t("news.form"),
        icon: "$openNew",
        link: "newsCreate"
      },
      {
        index: 1,
        i18n: this.$t("news.search"),
        icon: "$medicalBag",
        link: "newsSearchCard"
      },
      {
        index: 2,
        i18n: this.$t("news.content"),
        icon: "$medicalBag",
        link: "newsAll"
      }
    ];
  }
}
</script>

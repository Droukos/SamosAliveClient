<template>
  <div>
    <SubNavBackBtn />
    <v-list-item
      v-for="(item, index) in problemsListOptions"
      :key="index"
      @click="to(index)"
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ item.i18n }}</v-list-item-title>
      <div v-if="item.rArrowIcon">
        <v-spacer />
        <v-icon>{{ "$chevRight" }}</v-icon>
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
      name: this.problemsListOptions[index].link
    });
  }

  get problemsListOptions() {
    return [
      {
        index: 0,
        i18n: this.$t("problems.form"),
        icon: "$openNew",
        link: "problemsCreate"
      },
      {
        index: 1,
        i18n: this.$t("problems.search"),
        icon: "$medicalBag",
        link: "problemList"
      }
    ];
  }
}
</script>

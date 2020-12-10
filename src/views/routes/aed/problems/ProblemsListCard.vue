<template>
  <v-main>
    <h3 v-text="$t('events.problemListInfo')" />
    <v-card class="mx-auto">
      <AedProblemsSearch />
    </v-card>
    <ProblemsListPanel />
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import problemsListMod from "@/store/modules/dynamic/aed/problems/problems-list";

const problemsList = namespace("problemsList");

@Component({
  components: {
    ProblemsListPanel: () =>
      import(
        /* webpackChunkName: "ProblemsListPanel" */ "@/components/problems/ProblemsListPanel.vue"
      ),
    AedProblemsSearch: () =>
      import(
        /* webpackChunkName: "ProblemsListPanel" */ "@/components/problems/info/AedProblemsSearch.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const problemsListCard = vm as ProblemsListCard;
      const store = problemsListCard.$store;
      if (!(store && store.state && store.state["problemsList"])) {
        store.registerModule("problemsList", problemsListMod);
      }
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("problemsList");
  }
})
export default class ProblemsListCard extends Vue {}
</script>

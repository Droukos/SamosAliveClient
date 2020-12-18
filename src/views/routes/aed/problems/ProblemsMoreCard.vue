<template>
  <v-main>
    <v-skeleton-loader
      class="mx-auto"
      max-width="400"
      :loading="loadingSkeleton"
      transition="scale-transition"
      type="card"
    >
      <v-card>
        <v-card-title class="primary">
          <AedProblemsTitle />
        </v-card-title>
        <v-list-item three-line>
          <v-list-item-content>
            <v-card-text>
              <AedProblemsAddress />
            </v-card-text>
            <v-card-text>
              <AedProblemsBody />
            </v-card-text>
            <v-list-item-subtitle bottom>
              <AedProblemsUsername /> - <AedProblemsUploadedTime />
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
              <AedProblemsStatus />
            </v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <AedProblemsInfoButtons />
        </v-card-actions>
      </v-card>
    </v-skeleton-loader>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ProblemsDto } from "@/types/aed-problems";
import aedProblemsInfoMod from "@/store/modules/dynamic/aed/problems/aed-problems-info";

const aedProblemsInfo = namespace("aedProblemsInfo");

@Component({
  components: {
    AedProblemsAddress: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsAddress.vue"
      ),
    AedProblemsBody: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsBody.vue"
      ),
    AedProblemsInfoButtons: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsInfoButtons.vue"
      ),
    AedProblemsCompletedTime: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsCompletedTime.vue"
      ),
    AedProblemsConclusion: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsConclusion.vue"
      ),
    AedProblemsUploadedTime: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsUploadedTime.vue"
      ),
    AedProblemsStatus: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsStatus.vue"
      ),
    AedProblemsTechnical: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsTechnical.vue"
      ),
    AedProblemsTitle: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsTitle.vue"
      ),
    AedProblemsUsername: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsUsername.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const problemsMoreCard = vm as ProblemsMoreCard;
      const store = problemsMoreCard.$store;
      if (!(store && store.state && store.state["aedProblemsInfo"])) {
        store.registerModule("aedProblemsInfo", aedProblemsInfoMod);
      }
      problemsMoreCard.findProblemsId({ id: to.params.problemsID }).then(() => {
        problemsMoreCard.loadingSkeleton = false;
      });
    });
  }
})
export default class ProblemsMoreCard extends Vue {
  loadingSkeleton = true;
  @aedProblemsInfo.Action findProblemsId!: (data: ProblemsDto) => Promise<any>;
  //@aedProblemsInfo.State id!: string;
}
</script>

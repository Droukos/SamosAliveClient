<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in previewProblems" :key="item.index" :cols="12">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                <AedProblemsTitle :title="item.title" />
              </v-list-item-title>
              <v-list-item-title>
                <AedProblemsAddress :address="item.address" />
              </v-list-item-title>
              <v-list-item-subtitle bottom>
                <AedProblemsBody :body="item.body" />
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>
                <AedProblemsStatus :status="item.status" />
                <br />
                <AedProblemsUsername :username="item.username" />
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-card-actions>
            <h6>
              <AedProblemsUploadedTime :uploadedTime="item.uploadedTime" />
            </h6>
            <v-spacer />
            <v-btn
              color="primary"
              dark
              @click="more(item.id)"
              v-text="$t('history.more')"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const problemsList = namespace("problemsList");

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
    AedProblemsUploadedTime: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsUploadedTime.vue"
      ),
    AedProblemsStatus: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsStatus.vue"
      ),
    AedProblemsTitle: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsTitle.vue"
      ),
    AedProblemsUsername: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/problems/info/AedProblemsUsername.vue"
      )
  }
})
export default class ProblemsListPanel extends Vue {
  @problemsList.State previewProblems!: [];
  more(id: string) {
    this.$router.push({
      name: "problemsMore",
      params: { problemsID: id }
    });
  }
}
</script>

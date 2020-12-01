<template>
  <v-main>
    <h3 v-text="$t('events.problemListInfo')" />
    <v-btn
      href="#"
      color="primary"
      v-text="$t('problems.form')"
      @click="showDialog()"
      aria-label="ShowDialog"
    />
    <v-card class="mx-auto">
      <v-text-field
        color="indigo"
        dark
        v-model="model.search"
        :loading="model.isLoading"
        class="pt-1"
        :counter="model.counter"
        :label="model.label"
        @keyup="searchProblem()"
        outlined
      ></v-text-field>
    </v-card>
    <ProblemsListPanel />
    <div class="text-center">
      <v-dialog v-model="dialog">
        <v-card>
          <form action id="problemsForm" method="POST">
            <v-card-title class="light-blue darken-1" primary-title>
              <h6 v-text="$t('problems.form')" />
            </v-card-title>

            <v-card-text>
              <h5 v-text="$t('problems.problemTitle')" />
              <v-text-field v-model="title.text" solo></v-text-field>
              <h5 v-text="$t('problems.problemContent')" />
              <v-textarea
                v-model="info.text"
                counter
                maxlength="500"
                full-width
              ></v-textarea>
            </v-card-text>
          </form>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="sendAedProblems()"
              v-text="$t('problems.submit')"
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedProblemsInfo, User } from "@/types";
import problemsListMod from "@/store/modules/dynamic/aed/problems/problems-list";

const aedProblems = namespace("aedProblems");
const user = namespace("user");
const problemsList = namespace("problemsList");

@Component({
  components: {
    ProblemsListPanel: () =>
      import(
        /* webpackChunkName: "ProblemsListPanel" */ "@/components/problems/ProblemsListPanel.vue"
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
export default class ProblemsListCard extends Vue {
  model = {
    search: "",
    isLoading: false,
    counter: 50,
    label: this.$t("history.searchProblem")
  };
  title = {
    text: ""
  };
  info = {
    text: ""
  };
  dialog = false;
  previewProblems = [];
  statusString(status: number) {
    if (status == 1) {
      return this.$t("events.statusS1");
    }
    if (status == 2) {
      return this.$t("events.statusS2");
    }
    if (status == 3) {
      return this.$t("events.statusS3");
    }
  }

  @problemsList.Action fetchProblemsPreview!: (title: string) => Promise<any>;
  @user.State username!: User.Username;
  @user.State address!: string;
  @aedProblems.Action createAedProblems!: (
    data: AedProblemsInfo
  ) => Promise<void>;

  sendAedProblems() {
    this.createAedProblems({
      username: this.username,
      problemsTitle: this.title.text,
      address: this.address,
      information: this.info.text,
      status: 1
    }).then(() => {
      console.log("run");
    });
    this.dialog = false;
  }

  showDialog() {
    this.dialog = true;
  }

  fetchProblemsPreviewList() {
    setTimeout(() => {
      this.fetchProblemsPreview(this.model.search).then(response => {
        this.previewProblems = response;
      });
    }, 700);
  }
  searchProblem() {
    this.fetchProblemsPreviewList();
  }
}
</script>

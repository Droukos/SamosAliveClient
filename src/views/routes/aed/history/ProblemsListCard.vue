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
                v-model="body.text"
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
              v-text="$t('submit')"
              @click="sendAedProblems()"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

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
import { User } from "@/types";
import { AedProblemsCreateDto } from "@/types/aed-problems";

const aedProblems = namespace("aedProblems");
const user = namespace("user");

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
export default class ProblemsListCard extends Vue {
  title = {
    text: ""
  };
  body = {
    text: ""
  };
  dialog = false;

  showDialog() {
    this.dialog = true;
  }
  @user.State username!: User.Username;
  @aedProblems.Action createAedProblems!: (
    data: AedProblemsCreateDto
  ) => Promise<void>;

  sendAedProblems() {
    this.createAedProblems({
      username: this.username,
      title: this.title.text,
      body: this.body.text,
      mapX: 0,
      mapY: 0,
      address: "this.address"
    }).then(() => {
      console.log("run");
    });
    this.dialog = false;
  }
}
</script>

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
        prepend-icon="mdi-database-search"
        @keyup="searchProblem()"
        outlined
      ></v-text-field>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="item in items" :key="item.index" :cols="12">
            <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    item.title
                  }}</v-list-item-title>
                  <v-list-item-title>{{ item.user }} </v-list-item-title>
                  <v-list-item-subtitle>{{ item.addr }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>{{
                    item.status
                  }}</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-text="$t('history.more')" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
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

const aedProblem = namespace("aedProblem");
const user = namespace("user");
const search = namespace("search");

@Component
export default class ProblemList extends Vue {
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
  items = [];

  @search.Action fetchProblemsPreview!: (title: string) => Promise<any>;
  @user.State userid!: User.UserId;
  @user.State username!: User.Username;
  @user.State address!: string;
  @aedProblem.Action createAedProblems!: (data: AedProblemsInfo) => Promise<void>;

  sendAedProblems() {
    this.createAedProblems({
      userid: this.userid,
      username: this.username,
      title: this.title.text,
      address: this.address,
      info: this.info.text,
      status: "Pending"
    }).then(() => {
      console.log("run");
    });
    this.dialog = false;
  }

  fetchProblemsPreviewList() {
    setTimeout(() => {
      this.fetchProblemsPreview(this.model.search)
        .then(response => {
          console.log(response.data);
          this.items = response.data;
        })
        .finally(() => (this.model.isLoading = false));
    }, 700);
  }
  searchProblem() {
    this.model.isLoading = true;
    this.fetchProblemsPreviewList();
  }

  showDialog() {
    this.dialog = true;
  }
}
</script>

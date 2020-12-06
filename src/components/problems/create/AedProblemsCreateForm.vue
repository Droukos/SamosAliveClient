<template>
  <v-dialog v-model="dialog">
    <v-card>
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
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <AedProblemsCreateButton />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "@/types";
import { AedProblemsCreateDto } from "@/types/aed-problems";

const aedProblems = namespace("aedProblems");
const user = namespace("user");

@Component({
  components: {
    AedProblemsCreateButton: () =>
      import(
        /* webpackChunkName: "ProblemsListPanel" */ "@/components/problems/create/AedProblemsCreateButton.vue"
      )
  }
})
export default class AedProblemsCreateForm extends Vue {
  dialog = false;

  //dunamika kai me mutation boolean

  showDialog() {
    this.dialog = true;
  }
  title = {
    text: ""
  };
  body = {
    text: ""
  };

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

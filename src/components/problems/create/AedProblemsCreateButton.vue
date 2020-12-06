<template>
  <v-btn color="primary" v-text="$t('submit')" @click="sendAedProblems()" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "@/types";
import { AedProblemsCreateDto } from "@/types/aed-problems";

const aedProblems = namespace("aedProblems");
const user = namespace("user");

@Component
export default class AedProblemsInfoButton extends Vue {
  @user.State username!: User.Username;
  @aedProblems.Action createAedProblems!: (
    data: AedProblemsCreateDto
  ) => Promise<void>;

  sendAedProblems() {
    this.createAedProblems({
      username: this.username,
      title: "",
      body: "",
      mapX: 0,
      mapY: 0,
      address: ""
    }).then(() => {
      console.log("run");
    });
    //this.dialog = false;
  }
}
</script>

<template>
  <v-main>
    <v-card>
      <v-card-title class="light-blue darken-1" primary-title>
        <h3 v-text="$t('problems.form')" />
      </v-card-title>

      <v-card-text>
        <h4 v-text="$t('problems.problemTitle')" />
        <AedProblemsInputTitle />
        <h4 v-text="$t('problems.problemContent')" />
        <AedProblemsInputBody />
        <SearchMapAedDevice />
        <v-divider />
        <SearchAedDeviceSelectList />
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          v-if="createVisible"
          color="primary"
          v-text="$t('submit')"
          @click="sendAedProblems()"
        />
        <p
          v-if="successSubmit"
          class="green--text"
          v-text="$t('problems.success')"
        />
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import aedProblemsCreateMod from "@/store/modules/dynamic/aed/problems/aed-problems-create";
import searchMod from "@/store/modules/dynamic/search/search";
import { FieldObject, User } from "@/types";
import { AedProblemsCreateDto } from "@/types/aed-problems";

const aedProblemsCreate = namespace("aedProblemsCreate");
const user = namespace("user");

@Component({
  components: {
    AedProblemsInputTitle: () =>
      import(
        /* webpackChunkName: "ProblemsListPanel" */ "@/components/problems/create/AedProblemsInputTitle.vue"
      ),
    AedProblemsInputBody: () =>
      import(
        /* webpackChunkName: "ProblemsListPanel" */ "@/components/problems/create/AedProblemsInputBody.vue"
      ),
    SearchMapAedDevice: () =>
      import(
        /* webpackChunkName: "SearchMapAedDevice" */ "@/components/search/aed/device/SearchMapAedDevice.vue"
      ),
    SearchAedDeviceSelectList: () =>
      import(
        /* webpackChunkName: "SearchAedDeviceSelectList" */ "@/components/search/SearchAedDeviceSelectList.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const problemsCreateCard = vm as ProblemsCreateCard;
      const store = problemsCreateCard.$store;
      if (!(store && store.state && store.state["aedProblemsCreate"])) {
        store.registerModule("aedProblemsCreate", aedProblemsCreateMod);
      }
      if (!(store && store.state && store.state["search"])) {
        store.registerModule("search", searchMod);
      }
    });
  }
  //,
  //beforeDestroy() {
  //  this.$store.unregisterModule("aedProblemsCreate");
  //}
})
export default class ProblemsCreateCard extends Vue {
  @user.State username!: User.Username;
  @aedProblemsCreate.State fTitle!: number;
  @aedProblemsCreate.State fBody!: FieldObject;
  @aedProblemsCreate.State fAedDeviceId!: string;
  @aedProblemsCreate.State createVisible!: boolean;
  @aedProblemsCreate.State successSubmit!: boolean;
  @aedProblemsCreate.Mutation setCreateVisible!: (bool: boolean) => void;
  @aedProblemsCreate.Mutation setSuccessSubmit!: (bool: boolean) => void;
  @aedProblemsCreate.Action createAedProblems!: (
    data: AedProblemsCreateDto
  ) => Promise<void>;

  sendAedProblems() {
    this.createAedProblems({
      username: this.username,
      title: this.fTitle,
      body: this.fBody.v,
      aedDeviceId: this.fAedDeviceId
    }).then(() => {
      this.setSuccessSubmit(true);
      this.setCreateVisible(false);
      console.log("run");
    });
  }
}
</script>

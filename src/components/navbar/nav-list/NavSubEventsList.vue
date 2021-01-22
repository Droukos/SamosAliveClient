<template>
  <div>
    <SubNavBackBtn />
    <v-list-item
      v-for="(item, index) in aedSubEvents"
      :key="index"
      @click="to(item)"
    >
      <v-list-item-title v-text="'ID: ' + item" />
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const environment = namespace("environment");
const user = namespace("user");

@Component({
  components: {
    SubNavBackBtn: () =>
      import(
        /* webpackChunkName: "SubNavBackBtn" */ "@/components/navbar/nav-utility/SubNavBackBtn.vue"
      )
  }
})
export default class NavSubEventsList extends Vue {
  @environment.Getter subNavBavOpen!: number;
  @user.State aedSubEvents!: string[];

  to(ch: string) {
    this.$router.push({
      name: "aedEventChannel",
      params: {
        eventID: ch
      }
    });
  }
}
</script>

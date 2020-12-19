<template>
  <div>
    <SubNavBackBtn />
    <v-list-item
      v-for="(item, index) in healthListOptions"
      :key="index"
      @click="to(index)"
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ item.i18n }}</v-list-item-title>
      <div v-if="item.rArrowIcon">
        <v-spacer />
        <v-icon>{{ "$chevRight" }}</v-icon>
      </div>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const environment = namespace("environment");

@Component({
  components: {
    SubNavBackBtn: () =>
      import(
        /* webpackChunkName: "SubNavBackBtn" */ "@/components/navbar/nav-utility/SubNavBackBtn.vue"
      )
  }
})
export default class NavBarHealthList extends Vue {
  @environment.Getter subNavBavOpen!: number;

  to(index: number) {
    this.$router.push({
      name: this.healthListOptions[index].link
    });
  }

  get healthListOptions() {
    return [
      {
        index: 0,
        i18n: this.$t("sub-apps-health.device.register"),
        icon: "$openNew",
        link: "registerAedDevice"
      },
      {
        index: 1,
        i18n: this.$t("sub-apps-health.emergency.request"),
        icon: "$medicalBag",
        link: "createAedEvent"
      },
      {
        index: 2,
        i18n: this.$t("sub-apps-health.emergency.watch"),
        icon: "$eye",
        link: ""
      },
      {
        index: 3,
        i18n: this.$t("sub-apps-health.emergency.live"),
        icon: "$accessPoint",
        link: ""
      }
    ];
  }
}
</script>

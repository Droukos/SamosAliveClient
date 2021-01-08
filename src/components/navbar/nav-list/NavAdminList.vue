<template>
  <div>
    <SubNavBackBtn />
    <v-list-item
      v-for="(item, index) in adminListOptions"
      :key="index"
      @click="to(index)"
    >
      <v-list-item-icon>
        <v-icon v-text="item.icon" />
      </v-list-item-icon>
      <v-list-item-title v-text="item.i18n" />
      <div v-if="item.rArrowIcon">
        <v-spacer />
        <v-icon v-text="'$chevRight'" />
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
export default class NavAdminList extends Vue {
  @environment.Getter subNavBavOpen!: number;

  to(index: number) {
    this.$router.push({
      name: this.adminListOptions[index].link
    });
  }

  get adminListOptions() {
    return [
      {
        index: 0,
        i18n: this.$t("admin.mixin"),
        icon: "$headAll",
        link: "adminMixinUsers"
      },
      {
        index: 1,
        i18n: this.$t("admin.banS"),
        icon: "$gavel",
        link: "adminBanUsers"
      },
      {
        index: 2,
        i18n: this.$t("admin.unbanS"),
        icon: "$gavel",
        link: "adminUnbanUsers"
      },
      {
        index: 3,
        i18n: this.$t("admin.chaRolesS"),
        icon: "$chessRook",
        link: "adminRolesChange"
      },
      {
        index: 4,
        i18n: this.$t("admin.addRolesS"),
        icon: "$headPlus",
        link: "adminRolesAdd"
      },
      {
        index: 5,
        i18n: this.$t("admin.delRolesS"),
        icon: "$headMinus",
        link: "adminRolesDel"
      }
    ];
  }
}
</script>

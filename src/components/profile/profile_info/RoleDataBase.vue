<template>
  <div v-if="showRole">
    <v-list-item-title class="title text-wrap" style="color:#66BB6A"
      >{ roles }}</v-list-item-title
    >
    <v-list-item-subtitle v-if="isOnline" style="color:#18FFFF">{{
      $t("user.online")
    }}</v-list-item-subtitle>
    <v-list-item-subtitle v-else style="color:#455A64">{{
      $t("user.offline")
    }}</v-list-item-subtitle>
  </div>
</template>

<script lang="ts">
//$t("roles." + roles)
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Role } from "@/types";
const profile = namespace("profile");
@Component
export default class RoleDataBase extends Vue {
  @Prop() public showRole!: boolean;
  @profile.State public isOnline!: boolean;
  @profile.State public roles!: Array<Role>;
}
</script>

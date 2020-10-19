<template>
  <div v-if="showRole">
    <v-list-item
      v-for="role in roleModels"
      :key="role.code"
      class="'title text-wrap"
    >
      <p :class="$helper.getUserRoleColorText(role.code)">
        {{ $t(role.role) }}
      </p>
    </v-list-item>

    <v-list-item-subtitle v-if="isOnline" style="color:#18FFFF">{{
      $t("user.online")
    }}</v-list-item-subtitle>
    <v-list-item-subtitle v-else style="color:#455A64">{{
      $t("user.offline")
    }}</v-list-item-subtitle>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Role } from "@/types";
const profile = namespace("profile");
@Component
export default class RoleDataBase extends Vue {
  @Prop() public showRole!: boolean;
  @profile.State public isOnline!: boolean;
  @profile.State public roleModels!: Array<Role>;
}
</script>

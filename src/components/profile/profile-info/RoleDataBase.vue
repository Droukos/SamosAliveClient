<template>
  <div v-if="showRole">
    <v-list-item
      v-for="role in roleModels"
      :key="role.code"
      class="'title text-wrap"
    >
      <p
        :class="$helper.getUserRoleColorText(role.code)"
        v-text="$t(role.role)"
      />
    </v-list-item>

    <v-list-item-subtitle
      v-if="isOnline"
      style="color:#18FFFF"
      v-text="$t('user.online')"
    />
    <v-list-item-subtitle
      v-else
      style="color:#455A64"
      v-text="$t('user.offline')"
    />
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

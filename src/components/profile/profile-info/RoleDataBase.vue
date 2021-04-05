<template>
  <div v-if="showRole">
    <v-list-item v-for="role in roleModels" :key="role.code" class="text-wrap">
      <VChip
        :color="$helper.getUserRoleColorLabel(role.role)"
        style="color: white"
        v-text="$t(role.role)"
      />
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Role } from "@/types";
const profile = namespace("profile");

@Component
export default class RoleDataBase extends Vue {
  @Prop() showRole!: boolean;
  @profile.State roleModels!: Array<Role>;
}
</script>

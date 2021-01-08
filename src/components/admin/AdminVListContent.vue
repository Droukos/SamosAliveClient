<template>
  <VListItemContent @click="selectUser()">
    <v-list-item-title>
      <span class="grey--text" v-text="$t('fields.username') + ': '" />
      <span class="green--text" v-text="prUser.user" />
    </v-list-item-title>
    <v-list-item-subtitle>
      <span class="grey--text" v-text="$t('fields.fullname') + ': '" />
      <span class="green--text" v-text="prUser.sur + ' ' + prUser.name" />
    </v-list-item-subtitle>
    <v-list-item-subtitle>
      <span class="grey--text" v-text="$t('roles.title') + ' '" />
      <v-chip
        v-for="role in prUser.roles"
        :key="role"
        :color="$helper.getUserRoleColorLabel(role)"
        v-text="$t('roles.' + role)"
      />
    </v-list-item-subtitle>
    <v-list-item-subtitle>
      <span class="grey--text" v-text="$t('status.title') + ' '" />
      <span
        :class="statusColor(prUser.status)"
        v-text="$t('status.' + prUser.status)"
      />
    </v-list-item-subtitle>
  </VListItemContent>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PreviewUser } from "@/types";

@Component
export default class AdminVListContent extends Vue {
  @Prop() prUser!: PreviewUser;
  @Prop() selectable!: (prUser: PreviewUser) => void;

  selectUser() {
    if (this.selectable != null) {
      this.selectable(this.prUser);
    }
  }

  statusColor(status: number) {
    return this.$helper.getUserStatusColorLabel(status);
  }
}
</script>

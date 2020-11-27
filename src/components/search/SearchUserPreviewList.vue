<template>
  <v-card>
    <v-list three-line>
      <v-list-item
        v-for="item in previewUsers"
        :key="item.id"
        @click="goToProfile(item.id)"
      >
        <v-list-item-avatar>
          <avatar-base
            size="190"
            :username="item.user"
            style="font-size: 25px;color:black;"
          ></avatar-base>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <div class="d-flex flex-row">
              <p class="pr-2" style="font-weight: bold;">{{ item.user }}</p>
              <v-chip
                v-for="role in item.roles"
                :key="role"
                label
                x-small
                :class="$helper.getUserRoleColorLabel(role) + ' mr-1'"
                style="font-weight: bold"
              >
                {{ $t("roles." + role) }}
              </v-chip>
              <p
                :class="$helper.getUserStatusColorLabel(item.status)"
                style="font-weight: bold;"
              >
                {{ $t("status." + item.status) }}
              </p>
            </div>
          </v-list-item-title>
          <div class="d-flex flex-row">
            <p class="grey--text text--darken-1" style="font-size:16px;">
              {{ item.name }} {{ item.sur }}
            </p>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RequestedPreviewUser } from "@/types";

@Component({
  components: {
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ /* webpackPreload: true */ "@/components/profile/avatar/AvatarBase.vue"
      )
  }
})
export default class SearchUserPreviewList extends Vue {
  @Prop()
  previewUsers!: RequestedPreviewUser[];

  goToProfile(userId: string) {
    this.$router.push({
      name: "user_profile",
      params: {
        userID: userId
      }
    });
  }
}
</script>

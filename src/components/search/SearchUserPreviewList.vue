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
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <div class="d-flex flex-row">
              <p class="pr-2" style="font-weight: bold;" v-text="item.user" />
              <v-chip
                v-for="role in item.roles"
                :key="role"
                label
                x-small
                :class="$helper.getUserRoleColorLabel(role) + ' mr-1'"
                style="font-weight: bold"
                v-text="$t('roles.' + role)"
              />
              <p
                :class="$helper.getUserStatusColorLabel(item.status)"
                style="font-weight: bold;"
                v-text="$t('status.' + item.status)"
              />
            </div>
          </v-list-item-title>
          <div class="d-flex flex-row">
            <p
              class="grey--text text--darken-1"
              style="font-size:16px;"
              v-text="item.name + ' ' + item.sur"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PreviewUser } from "@/types";
import { namespace } from "vuex-class";

const search = namespace("search");

@Component({
  components: {
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ /* webpackPreload: true */ "@/components/profile/avatar/AvatarBase.vue"
      )
  }
})
export default class SearchUserPreviewList extends Vue {
  @search.State previewUsers!: PreviewUser[];

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

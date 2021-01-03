<template>
  <v-card>
    <v-container>
      <div v-if="$vuetify.breakpoint.smAndDown">
        <div class="d-flex flex-row">
          <VAvatar class="mb-1" :size="40">
            <AvatarBase
              :username="comment.username"
              :avatar="fetchUserAvatar(comment.username)"
              :size="40"
            />
          </VAvatar>
          <div class="d-flex flex-column ml-2">
            <div class="d-flex flex-row">
              <span v-text="comment.username" />
              <span
                :class="'ml-2 ' + $helper.getUserStatusColorLabel(user.status)"
                v-text="$t('status.' + user.status)"
              />
            </div>
            <div class="d-flex flex-row">
              <VChip
                x-small
                v-for="role in user.roles"
                :color="$helper.getUserRoleColorLabel(role)"
                :key="role"
                v-text="role"
              />
            </div>
          </div>
        </div>
        <v-divider />
        <div class="d-flex flex-column ml-2">
          <CommentTimestamp
            :timestamp="$helper.convDate2(comment.posted, 'long', locale)"
          />
          <span v-text="comment.message" />
        </div>
      </div>
      <div v-else>
        <div class="d-flex flex-row">
          <div class="d-flex flex-column">
            <VAvatar :size="100">
              <AvatarBase
                :username="comment.username"
                :avatar="fetchUserAvatar(comment.username)"
                :size="100"
              />
            </VAvatar>
            <span class="mx-auto" v-text="comment.username" />
            <span
              :class="'mx-auto ' + $helper.getUserStatusColorLabel(user.status)"
              v-text="$t('status.' + user.status)"
            />

            <VChip
              class="mx-auto"
              v-for="role in user.roles"
              :color="$helper.getUserRoleColorLabel(role)"
              :key="role"
              v-text="role"
            />
          </div>

          <v-divider class="ml-2" vertical />
          <div class="d-flex flex-column ml-2">
            <CommentTimestamp
              :timestamp="$helper.convDate2(comment.posted, 'long', locale)"
            />
            <span v-text="comment.message" />
          </div>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AedEvent } from "@/types/aed-event";
import AedComment = AedEvent.AedComment;
import { namespace } from "vuex-class";
import { PreviewUserCh } from "@/types";

const environment = namespace("environment");
const eChannel = namespace("aedEventChannelSub");

@Component({
  components: {
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase.vue"
      ),
    CommentTimestamp: () =>
      import(
        /* webpackChunkName: "CommentTimestamp" */ "@/components/event/channel/comment/CommentTimestamp.vue"
      )
  }
})
export default class ChannelComment extends Vue {
  @Prop() comment!: AedComment;
  @Prop() user!: PreviewUserCh;
  @environment.State locale!: string;
  @eChannel.Getter fetchUserAvatar!: (username: string) => string;
}
</script>

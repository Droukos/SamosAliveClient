<template>
  <div>
    <v-subheader v-text="$t('events.discuss')" />
    <v-pagination
      v-model="curPage"
      :length="discussionPages"
      :total-visible="7"
    />
    <ChannelComment
      v-for="comment in showAedComments"
      :key="comment.id"
      :comment="comment"
      :user="fetchUser(comment.username)"
      class="mb-2"
    />
    <CommentInput />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedEvent } from "@/types/aed-event";
import AedComment = AedEvent.AedComment;
import AedCommentReqDto = AedEvent.AedCommentReqDto;
import { PreviewUserCh } from "@/types";

const eChannel = namespace("aedEventChannelSub");

@Component({
  components: {
    ChannelComment: () =>
      import(
        /* webpackChunkName: "ChannelComment" */ "@/components/event/channel/ChannelComment.vue"
      ),
    CommentInput: () =>
      import(
        /* webpackChunkName: "CommentInput" */ "@/components/event/channel/comment/CommentInput.vue"
      )
  }
})
export default class ChannelDiscussion extends Vue {
  @eChannel.State discPages!: number;
  @eChannel.State curEventId!: string;
  @eChannel.State showAedComments!: AedComment[];
  @eChannel.Mutation setWatchingPage!: (watchPage: number) => void;
  @eChannel.Getter fetchUser!: (username: string) => PreviewUserCh;
  @eChannel.Action fetchEventComments!: (data: AedCommentReqDto) => void;
  curPage = 0;

  @Watch("curPage")
  changePage(newVal: number) {
    this.setWatchingPage(newVal - 1);
    this.fetchEventComments({
      eventId: this.curEventId,
      pageOffset: newVal - 1
    });
  }

  get discussionPages() {
    return this.discPages + 1;
  }
}
</script>

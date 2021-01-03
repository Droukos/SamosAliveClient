<template>
  <div>
    <VTextarea
      v-model="comment"
      outlined
      clearable
      shaped
      auto-grow
      hide-details
      row-height="15"
      :label="$t('events.comment')"
    />
    <v-card>
      <div class="d-flex flex-row">
        <v-spacer />
        <VBtn
          class="deep-purple darken-2"
          style="color:white;"
          v-text="$t('events.send')"
          @click="sendComment"
        />
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedEvent } from "@/types/aed-event";
import AedEventCommentDto = AedEvent.AedEventCommentDto;

const eChannel = namespace("aedEventChannelSub");

@Component
export default class CommentInput extends Vue {
  @eChannel.State curEventId!: string;
  @eChannel.Action postAedComment!: (data: AedEventCommentDto) => void;
  comment = "";

  sendComment() {
    this.postAedComment({
      eventId: this.curEventId,
      comment: this.comment
    });
    this.comment = "";
  }
}
</script>

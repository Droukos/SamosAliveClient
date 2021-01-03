<template>
  <div>
    <div class="d-flex flex-row">
      <VAvatar size="70">
        <AvatarBase
          :size="70"
          :username="selectedRescuer.user"
          :avatar="selectedRescuer.avatar"
        />
      </VAvatar>
      <v-spacer />
      <VBtn v-text="'Go to profile'" />
    </div>

    <v-list-item-content>
      <v-list-item-title>
        <div class="d-flex flex-row">
          <p
            class="pr-2"
            style="font-weight: bold;"
            v-text="$t('fields.username') + ': ' + selectedRescuer.user"
          />
        </div>
      </v-list-item-title>

      <p
        class="grey--text text--darken-1"
        style="font-size:16px;"
        v-text="$t('fields.name') + ': ' + selectedRescuer.name"
      />

      <p
        class="grey--text text--darken-1"
        style="font-size:16px;"
        v-text="$t('fields.surname') + ': ' + selectedRescuer.sur"
      />
      <p
        :class="statusClass(selectedRescuer.status)"
        style="font-size:16px;"
        v-text="$t('status.' + selectedRescuer.status)"
      />
    </v-list-item-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { PreviewUser } from "@/types";

const aedEventChannelsSub = namespace("aedEventChannelSub");
@Component({
  components: {
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase.vue"
      )
  }
})
export default class ChannelUserPreviewInfo extends Vue {
  @aedEventChannelsSub.State selectedRescuer!: PreviewUser;

  statusClass(status: number) {
    return this.$helper.getUserStatusColorLabel(status);
  }
}
</script>

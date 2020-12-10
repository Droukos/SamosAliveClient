<template>
  <v-dialog persistent v-model="dialog">
    <v-card>
      <form action id="eventForm" method="POST">
        <v-card-title class="light-blue darken-1" primary-title>
          <h6 v-text="$t('events.form')" />
        </v-card-title>

        <v-card-text>
          <h5 v-text="$t('events.eventInfo')" />
          <v-select
            v-model="selected"
            :items="items"
            item-text="msg"
            item-value="code"
          ></v-select>
          <EventAddressBase />
          <div
            :style="
              'height:' + ($vuetify.breakpoint.mdAndUp ? '600px' : '300px')
            "
          >
            <l-map :zoom="zoom" :center="center" style="z-index: 0;">
              <LTileLayerBase />
              <LMarkerRedSimple :marker="marker" />
            </l-map>
          </div>
          <h5 v-text="$t('events.comment')" />
          <v-textarea
            v-model="fComment.v"
            :label="fComment.f"
            maxlength="200"
            solo
          ></v-textarea>
        </v-card-text>
      </form>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn @click="setDialog(false)">
          Cancel
        </v-btn>
        <v-btn
          v-if="createVisible"
          color="primary"
          @click="sendAedEvent()"
          v-text="$t('events.send')"
          aria-label="SendEvent"
        >
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedEvent } from "@/types/aed-event";
import { AddressObject, FieldObject, User } from "@/types";
import { LMap, LControl } from "vue2-leaflet";
import L from "leaflet";
import AedEventCreateDto = AedEvent.AedEventCreateDto;

const aedEventCreate = namespace("aedEventCreate");
const user = namespace("user");

@Component({
  components: {
    LMap,
    LControl,
    LTileLayerBase: () =>
      import(
        /* webpackChunkName: "LTileLayerBase" */ "@/components/map/LTileLayerBase.vue"
      ),
    LMarkerRedSimple: () =>
      import(
        /* webpackChunkName: "LMarkerRedSimple" */ "@/components/map/LMarkerRedSimple.vue"
      ),
    LGeoSearch: () =>
      import(
        /* webpackChunkName: "LGeoSearch" */ "@/components/map/LGeoSearch.vue"
      ),
    EventAddressBase: () =>
      import(
        /* webpackChunkName: "AddressNameInputBase" */ "@/components/event/map/EventAddressBase.vue"
      )
  } //,
  //beforeRouteEnter(to, from, next) {
  //  next(vm => {
  //    const sedEventCreateDialog = vm as AedEventCreateDialog;
  //    const store = sedEventCreateDialog.$store;
  //    if (!(store && store.state && store.state["aedEventCreate"])) {
  //      store.registerModule("aedEventCreate", aedProblemsCreateMod);
  //    }
  //  });
  //},
  //beforeDestroy() {
  //  this.$store.unregisterModule("aedEventCreate");
  //}
})
export default class AedEventCreateDialog extends Vue {
  items = [
    { msg: this.$t("events.eventS1"), code: 1 },
    { msg: this.$t("events.eventS2"), code: 2 },
    { msg: this.$t("events.eventS3"), code: 3 }
  ];
  selected = this.items[0].code;
  select = {
    msg: this.$t("events.situation")
  };

  @aedEventCreate.State dialog!: boolean;
  @aedEventCreate.State zoom!: number;
  @aedEventCreate.State center!: L.LatLng;
  @aedEventCreate.State marker!: L.LatLng;
  @aedEventCreate.State fAddress!: AddressObject;
  @aedEventCreate.State fComment!: FieldObject;
  @aedEventCreate.State createVisible!: boolean;
  @user.State username!: User.Username;
  @aedEventCreate.Action createAedEvent!: (
    data: AedEventCreateDto
  ) => Promise<string>;
  @aedEventCreate.Mutation setDialog!: (dialog: boolean) => void;

  sendAedEvent() {
    this.createAedEvent({
      username: this.username,
      occurrenceType: this.selected,
      address: this.fAddress.v?.label,
      mapX: this.fAddress.v?.x,
      mapY: this.fAddress.v?.y,
      comment: this.fComment.v
    }).then(value => {
      this.$router.push({
        name: "aedEventChannel",
        params: { eventID: value }
      });
    });
    this.setDialog(false);
  }
}
</script>

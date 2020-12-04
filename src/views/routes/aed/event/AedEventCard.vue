<template>
  <v-main>
    <p v-text="$t('main')" />
    <v-btn
      href="#"
      color="primary"
      v-text="$t('events.event')"
      @click="showDialog()"
      aria-label="ShowDialog"
    />

    <div class="text-center">
      <v-dialog v-model="dialog">
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
                  <!--<l-control position="topright">
                    <v-btn @click="alert('he')"></v-btn>
                  </l-control>-->
                  <LMarkerRedSimple :marker="marker" />
                </l-map>
              </div>
              <!--<h5 v-text="$t('events.address')" />
              <v-text-field solo disabled :label="addresses.msg"></v-text-field>-->
              <h5 v-text="$t('events.comment')" />
              <v-textarea
                v-model="fComment.v"
                :label="comment.msg"
                maxlength="200"
                solo
              ></v-textarea>
            </v-card-text>
          </form>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false">
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
    </div>

    <!--<span>Κατάσταση ασθενούς: {{ selected }}</span>>-->
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AddressObject, FieldObject, User } from "@/types";
import { LMap, LControl } from "vue2-leaflet";
import L from "leaflet";
import aedEventAddressMod from "@/store/modules/dynamic/aed/events/aed-event-create";
import { AedEventCreateDto } from "@/types/aed-event";

const aedEventAddress = namespace("aedEventAddress");
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
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const eventCard = vm as EventCard;
      const store = eventCard.$store;
      if (!(store && store.state && store.state["aedEventAddress"])) {
        store.registerModule("aedEventAddress", aedEventAddressMod);
      }
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("aedEventAddress");
  }
})
export default class EventCard extends Vue {
  dialog = false;
  items = [
    { msg: this.$t("events.eventS1"), code: 1 },
    { msg: this.$t("events.eventS2"), code: 2 },
    { msg: this.$t("events.eventS3"), code: 3 }
  ];
  selected = this.items[0].code;
  select = {
    msg: this.$t("events.situation")
  };
  addresses = {
    msg: this.$t("events.address")
  };
  comment = {
    msg: this.$t("events.comInfo")
  };
  showDialog() {
    this.dialog = true;
  }

  @aedEventAddress.State zoom!: number;
  @aedEventAddress.State center!: L.LatLng;
  @aedEventAddress.State marker!: L.LatLng;
  @aedEventAddress.State fAddress!: AddressObject;
  @aedEventAddress.State fComment!: FieldObject;
  @aedEventAddress.State createVisible!: boolean;
  @user.State userid!: User.UserId;
  @user.State username!: User.Username;
  @aedEventAddress.Action createAedEvent!: (
    data: AedEventCreateDto
  ) => Promise<void>;

  sendAedEvent() {
    console.log(this.fAddress.v);
    this.createAedEvent({
      userid: this.userid,
      username: this.username,
      occurrenceType: this.selected,
      address: this.fAddress.v?.label,
      mapX: this.fAddress.v?.x,
      mapY: this.fAddress.v?.y,
      comment: this.fComment.v
    }).then(() => {
      console.log("run");
    });
    this.dialog = false;
  }
}
</script>

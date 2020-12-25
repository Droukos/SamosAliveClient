<template>
  <v-content>
    <v-container>
      <v-card>
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
          />
          <VTextField
            outlined
            v-model="fCallee.v"
            @keyup="checkCallee"
            :error-messages="fCallee.e"
            :label="fCallee.f"
            :counter="120"
          />
          <VTextField
            outlined
            v-model="fPhone.v"
            @keyup="checkPhone"
            :error-messages="fPhone.e"
            :label="fPhone.f"
            :counter="10"
          />
          <EventAddressBase />
          <div
            :style="
              'height:' + ($vuetify.breakpoint.mdAndUp ? '500px' : '300px')
            "
          >
            <LMap :zoom="zoom" :center="center" style="z-index: 0;">
              <LTileLayerBase />
              <LMarkerEventDraggable />
            </LMap>
          </div>
          <h5 v-text="$t('events.comment')" />
          <v-textarea
            v-model="fComment.v"
            :label="fComment.f"
            maxlength="200"
            solo
          />
        </v-card-text>
        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="createVisible"
            color="primary"
            @click="sendAedEvent()"
            v-text="$t('events.send')"
            aria-label="SendEvent"
          />
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import aedEventCreateMod from "@/store/modules/dynamic/aed/events/aed-event-create";
import L from "leaflet";
import { AddressObject, FieldObject, User } from "@/types";
import { namespace } from "vuex-class";
import { AedEventCreateDto } from "@/types/aed-event";
import { LControl, LMap } from "vue2-leaflet";
import { getLocation } from "@/plugins/geolocation";

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
    LMarkerEventDraggable: () =>
      import(
        /* webpackChunkName: "LMarkerEventDraggable" */ "@/components/map/markers/LMarkerEventDraggable.vue"
      ),
    EventAddressBase: () =>
      import(
        /* webpackChunkName: "AddressNameInputBase" */ "@/components/event/create/EventAddressBase.vue"
      )
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const aedEventCreateCard = vm as AedEventCreateCard;
      const store = aedEventCreateCard.$store;
      if (!(store && store.state && store.state["aedEventCreate"])) {
        store.registerModule("aedEventCreate", aedEventCreateMod);
      }
      getLocation(aedEventCreateCard.osmReverseGeoCodingOnCurPos);
    });
  },
  beforeDestroy() {
    this.$store.unregisterModule("aedEventCreate");
  }
})
export default class AedEventCreateCard extends Vue {
  items = [
    { msg: this.$t("events.eventS1"), code: 1 },
    { msg: this.$t("events.eventS2"), code: 2 },
    { msg: this.$t("events.eventS3"), code: 3 }
  ];
  selected = this.items[0].code;
  select = {
    msg: this.$t("events.situation")
  };

  @aedEventCreate.State zoom!: number;
  @aedEventCreate.State center!: L.LatLng;
  @aedEventCreate.State marker!: L.LatLng;
  @aedEventCreate.State fAddress!: AddressObject;
  @aedEventCreate.State fComment!: FieldObject;
  @aedEventCreate.State fPhone!: FieldObject;
  @aedEventCreate.State fCallee!: FieldObject;
  @aedEventCreate.State createVisible!: boolean;
  @user.State username!: User.Username;
  @user.State phones!: string;
  @user.Getter nameSurname!: string;
  @aedEventCreate.Action vForm!: () => void;
  @aedEventCreate.Action osmReverseGeoCodingOnCurPos!: (
    position: Position
  ) => void;
  @aedEventCreate.Action createAedEvent!: (
    data: AedEventCreateDto
  ) => Promise<string>;

  sendAedEvent() {
    this.createAedEvent({
      username: this.username,
      occurrenceType: this.selected,
      address: this.fAddress.v?.label,
      mapLat: this.fAddress.v?.y,
      mapLon: this.fAddress.v?.x,
      callee: this.fCallee.v,
      phone: this.fPhone.v,
      comment: this.fComment.v
    }).then(value => {
      this.$router.push({
        name: "aedEventChannel",
        params: { eventID: value }
      });
    });
  }

  @Watch("nameSurname")
  onNameChanged(newName: string) {
    this.fCallee.v = newName;
  }

  @Watch("phones")
  onPhonesChanged(phones: string[]) {
    this.fPhone.v = phones.length > 0 ? phones[0] : "";
  }

  checkCallee() {
    if (this.fCallee.v.length <= 120) {
      this.fCallee.e = "";
    } else {
      this.fCallee.e = [this.$t("events.invalidCallee")];
    }
    this.vForm();
    this.fCallee.run = true;
  }

  checkPhone() {
    if (RegExp("^\\d{10}$").test(this.fPhone.v)) {
      this.fPhone.e = "";
    } else {
      this.fPhone.e = [this.$t("events.invalidPhone")];
    }
    this.vForm();
    this.fPhone.run = true;
  }
}
</script>

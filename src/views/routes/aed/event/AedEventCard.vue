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
              <v-combobox
                v-model="select"
                :items="items"
                :label="selected.msg"
                required
              ></v-combobox>

              <h5 v-text="$t('events.address')" />
              <v-textarea solo disabled :label="addresses.msg"></v-textarea>
              <h5 v-text="$t('events.comment')" />
              <v-text-field
                v-model="comment.com"
                :label="comment.msg"
                solo
              ></v-text-field>
            </v-card-text>
          </form>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
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

    <!--<span>Κατάσταση ασθενούς: {{ selected }}</span>-->
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { AedEventInfo, User } from "@/types";

const aedEvent = namespace("aedEvent");
const user = namespace("user");

@Component
export default class EventCard extends Vue {
  dialog = false;
  select = [];
  items = [
    this.$t("events.eventS1"),
    this.$t("events.eventS2"),
    this.$t("events.eventS3")
  ];
  selected = {
    msg: this.$t("events.situation")
  };
  addresses = {
    msg: this.$t("events.address")
  };
  comment = {
    com: "",
    msg: this.$t("events.comInfo")
  };
  showDialog() {
    this.dialog = true;
  }

  @user.State userid!: User.UserId;
  @user.State username!: User.Username;
  @user.State address!: string;
  @aedEvent.Action createAedEvent!: (data: AedEventInfo) => Promise<void>;

  sendAedEvent() {
    this.createAedEvent({
      userid: this.userid,
      username: this.username,
      occurrenceType: "1",
      address: this.address,
      comment: this.comment.com,
      status: "Pending"
    }).then(() => {
      console.log("run");
    });
    this.dialog = false;
  }
}
</script>

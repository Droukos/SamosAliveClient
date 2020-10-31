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
              <select class="v-select" @change="getSelected($event.target.selectedIndex)">
                <option
                  v-for="(item, index) in items"
                  v-bind:value="item.msg"
                  v-bind:key="index"
                >
                  {{ item.msg }}
                </option>
              </select>
              <h5 v-text="$t('events.address')" />
              <v-text-field solo disabled :label="addresses.msg"></v-text-field>
              <h5 v-text="$t('events.comment')" />
              <v-textarea
                v-model="comment.com"
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
  items = [
    { msg: this.$t("events.eventS1") },
    { msg: this.$t("events.eventS2") },
    { msg: this.$t("events.eventS3") }
  ];
  selectedIndex = -1;
  select = {
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

  getSelected(selectedIndex: number) {
    console.log(selectedIndex);
    this.selectedIndex = selectedIndex;
  }

  @user.State userid!: User.UserId;
  @user.State username!: User.Username;
  @user.State address!: string;
  @aedEvent.Action createAedEvent!: (data: AedEventInfo) => Promise<void>;

  sendAedEvent() {
    this.createAedEvent({
      userid: this.userid,
      username: this.username,
      occurrenceType: this.selectedIndex,
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

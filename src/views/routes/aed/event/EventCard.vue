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
          <v-card-title class="light-blue darken-1" primary-title>
            <h6 v-text="$t('events.form')" />
          </v-card-title>

          <v-card-text>
            <h5 v-text="$t('events.eventInfo')" />
            <v-combobox v-model="select" :items="items"></v-combobox>

            <h5 v-text="$t('events.address')" />
            <v-textarea solo disabled label="Automati dieuthinsi"></v-textarea>
            <h5 v-text="$t('events.comment')" />
            <v-text-field label="*Extra info" solo></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="dialog = false"
              v-text="$t('events.send')"
              aria-label="SendEvent"
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <br /><br />
    <v-btn
      href="#"
      color="primary"
      v-text="$t('events.eventList')"
      router-link
      to="/eventList"
      aria-label="ToEventList"
    />
    <v-btn
      href="#"
      color="primary"
      v-text="$t('events.problemList')"
      router-link
      to="/problemList"
      aria-label="ToProblemList"
    />
    <br />

    <!--<span>Κατάσταση ασθενούς: {{ selected }}</span>-->
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EventCard extends Vue {
  dialog = false;
  select = [];
  items = [
    this.$t("events.eventS1"),
    this.$t("events.eventS2"),
    this.$t("events.eventS3")
  ];
  showDialog() {
    this.dialog = true;
  }
}
</script>

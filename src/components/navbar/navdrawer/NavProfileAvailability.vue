<template>
  <v-menu offset-x :close-on-click="true" :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        :class="statusClass(availabilityInfo[0])"
        height="18"
        v-bind="attrs"
        v-on="on"
        aria-label="ToStatusMenu"
      >
        {{ availability[1] }}
        <v-icon>{{ "$vuetify.icons.chevRight" }}</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item-group v-model="availabilityInfo[0]">
        <v-list-item v-for="(item, index) in statusInfo" :key="index">
          <v-list-item-title>
            <v-btn
              block
              :class="item.class"
              @click="changeStatusSel(item.index)"
              aria-label="StatusOption"
              >{{ item.title }}</v-btn
            >
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-btn block v-if="statusChanged" @click="applyStatus()">{{
      $t("forms.apply")
    }}</v-btn>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const user = namespace("user");
@Component
export default class NavProfileAvailability extends Vue {
  statusChanged = false;
  statusSelected = 0;
  @user.State availability: number | undefined;
  @user.Action changeStatus!: (status: number) => void;

  statusClass(status: number) {
    return this.$helper.getUserStatusColorLabel(status);
  }

  changeStatusSel(index: number) {
    this.statusSelected = index;
    this.statusChanged = true;
  }

  applyStatus() {
    this.statusChanged = false;
    this.changeStatus(this.statusSelected);
  }

  get availabilityInfo() {
    return [this.availability, this.$t("status." + this.availability)];
  }

  get statusInfo() {
    const status = [];
    for (let i = 0; i < 5; i++) {
      status.push({
        index: i,
        class: this.$helper.getUserStatusColorLabel(i),
        title: this.$t("status." + i)
      });
    }
    return status;
  }
}
</script>

<template>
  <v-sheet class="pa-1 d-flex flex-row">
    <span>{{ $t("status.title") }}</span>
    <v-spacer />

    <v-menu offset-y :close-on-click="true" :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          :class="statusClass(userAvailability)"
          height="18"
          v-bind="attrs"
          v-on="on"
          aria-label="ToStatusMenu"
        >
          {{ $t("status." + userAvailability) }}
          <v-icon>{{ "$chevDown" }}</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item-group>
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
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const user = namespace("user");

@Component({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const navProfileAvail = vm as NavProfileAvailability;
      navProfileAvail.availability = navProfileAvail.userAvailability;
    });
  }
})
export default class NavProfileAvailability extends Vue {
  statusChanged = false;
  statusSelected = 0;
  availability = 0;
  @user.Getter userAvailability!: number;
  @user.Action changeStatus!: (status: number) => Promise<number>;

  statusClass(status: number) {
    return this.$helper.getUserStatusColorLabel(status);
  }

  changeStatusSel(index: number) {
    this.statusSelected = index;
    this.statusChanged = true;
  }

  applyStatus() {
    this.statusChanged = false;
    this.changeStatus(this.statusSelected).then(num => {
      this.availability = num;
      console.log(this.availability);
    });
  }

  get availabilityInfo() {
    //this.$t("status." + this.availability)
    return this.userAvailability;
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

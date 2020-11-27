<template>
  <v-sheet class="pa-1 d-flex flex-row">
    <span>{{ $t("roles.title") }}</span>
    <v-spacer />

    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on" aria-label="ToRolesDialog">
          <v-chip :class="greatestRole.class">
            {{ greatestRole.title }}
            <v-icon>{{ "$chevDown" }}</v-icon>
          </v-chip>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          {{ $t("roles.change.title") }}
        </v-card-title>
        <v-list-item-group>
          <v-list-item v-for="(item, index) in rolesInfo" :key="index">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  block
                  v-bind="attrs"
                  v-on="on"
                  :class="item.class"
                  aria-label="StatusOption"
                  >{{ item.title }}
                  <v-checkbox
                    class="ml-2"
                    :disabled="isNotLastActiveRole"
                    input-value="true"
                  ></v-checkbox>
                </v-btn>
              </template>
              <span>{{ item.tooltip }}</span>
            </v-tooltip>
          </v-list-item>
        </v-list-item-group>
        <!--<v-card-text
          >Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.</v-card-text
        >-->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            {{ $t("general.cancel") }}
          </v-btn>
          <v-btn block v-if="roleChanged">{{ $t("forms.apply") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Role } from "@/types";

const user = namespace("user");
const environment = namespace("environment");

@Component
export default class NavProfileRoles extends Vue {
  @environment.State locale!: string;
  @user.State roleModels!: Role[];
  dialog = false;
  roleChanged = false;

  get rolesInfo() {
    return this.roleModels.map((role: Role) => ({
      index: role.role,
      title: this.$t("roles." + role.role),
      class: this.$helper.getUserRoleColorLabel(role.code),
      tooltip: this.$t("roles.addedBy", [
        role.addedBy,
        this.$helper.convDate(role.added, "long", this.locale)
      ])
    }));
  }

  get isNotLastActiveRole() {
    let oneActive = false;
    let isLastActive = true;
    this.roleModels.forEach((role: Role) => {
      if (role.active && oneActive) return (isLastActive = false);
      else if (role.active) oneActive = true;
    });
    return isLastActive;
  }

  get greatestRole() {
    const greatestRole = this.$helper.getGreatestRole(this.roleModels);

    return {
      title: this.$t("roles." + greatestRole.role),
      class: this.$helper.getUserRoleColorLabel(greatestRole.code)
    };
  }
}
</script>

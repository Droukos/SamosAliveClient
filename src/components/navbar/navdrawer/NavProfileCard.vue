<template>
  <v-list-item two-line :class="'px-0'">
    <v-list-item-avatar tile size="50">
      <AvatarBase :username="username" :avatar="avatar" size="50"></AvatarBase>
    </v-list-item-avatar>
    <v-list-item-content>
      <div @click="goToProfile()" style="cursor: pointer;">
        <v-list-item-title style="font-size:19px;">{{
          username
        }}</v-list-item-title>
        <v-menu offset-x :close-on-click="true" :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" aria-label="ToRolesMenu">
              <v-chip :class="greatestRole.class">
                {{ greatestRole.title }}
              </v-chip>
              <v-chip class=""
                ><v-icon>{{ "$vuetify.icons.chevDown" }}</v-icon></v-chip
              >
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group v-model="availabilityInfo[0]">
              <v-list-item v-for="(item, index) in rolesInfo" :key="index">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      block
                      v-bind="attrs"
                      v-on="on"
                      :class="item.class"
                      @click="changeStatus(item.index)"
                      aria-label="StatusOption"
                      >{{ item.title }}
                      <v-checkbox
                        class="ml-2"
                        :disabled="isNotLastActiveRole"
                        @click="deactivateRole()"
                        input-value="true"
                      ></v-checkbox>
                    </v-btn>
                  </template>
                  <span>{{ item.tooltip }}</span>
                </v-tooltip>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-btn block v-if="roleChanged">{{ $t("forms.apply") }}</v-btn>
        </v-menu>
      </div>

      <NavProfileAvailability></NavProfileAvailability>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Role } from "@/types";
import { namespace } from "vuex-class";

const user = namespace("user");
@Component({
  components: {
    AvatarBase: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase.vue"
      ),
    NavProfileAvailability: () =>
      import(
        /* webpackChunkName: "AvatarBase" */ "@/components/navbar/navdrawer/NavProfileAvailability.vue"
      )
  }
})
export default class NavBarProfile extends Vue {
  roleChanged = false;
  @user.State locale!: string;
  @user.State userid!: string;
  @user.State username!: string;
  @user.State avatar!: string;
  @user.State roleModels!: Role[];
  @user.State availability: number | undefined;

  goToProfile() {
    this.$router.push({
      name: "user_profile",
      params: {
        userID: this.userid
      }
    });
  }

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

  get availabilityInfo() {
    return [this.availability, this.$t("status." + this.availability)];
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

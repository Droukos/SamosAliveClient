<template>
  <v-sheet>
    <v-row no-gutters>
      <template v-for="option in accountOptions">
        <v-col :key="option.index">
          <v-btn
            text
            block
            class="text-none subtitle-1"
            @click="to(option)"
            v-text="option.name"
          />
        </v-col>
        <v-responsive
          v-if="option.index % 2 === 0"
          :key="`width-${option.index}`"
          width="100%"
        />
      </template>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
type accOption = { index: number; name: string; link: string };

const user = namespace("user");

@Component
export default class NavBarAccountOptions extends Vue {
  @user.State userid!: string;

  get accountOptions() {
    return [
      {
        index: 1,
        name: this.$t("user.personal"),
        link: "editprofile"
      },
      {
        index: 2,
        name: this.$t("user.security"),
        link: ""
      },
      {
        index: 3,
        name: this.$t("user.privacy"),
        link: "privacysettings"
      },
      {
        index: 4,
        name: this.$t("user.preferences"),
        link: ""
      }
    ];
  }

  to(option: accOption) {
    this.$router.push({
      name: option.link,
      params: {
        userID: this.userid
      }
    });
  }
}
</script>

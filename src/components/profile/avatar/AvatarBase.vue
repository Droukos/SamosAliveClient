<template>
  <v-card
    v-if="getIfAvatarNotExists"
    class="d-flex align-center justify-center"
    :style="getProfileBackgStyle"
  >
    <span>{{ getUsernameFirstLetter }}</span>
  </v-card>
  <div v-else class="d-flex justify-center">
    <span><img :src="avatar" :style="getProfileBackgStyle" alt class="user-profile-avatar" /></span>
  </div>
</template>

<script>
export default {
  props: ["avatar", "username", "size"],
  methods: {
    setBackgroundColor: function(username) {
      return this.$helper.usernameHashCode(username);
    }
  },
  computed: {
    getIfAvatarNotExists: function() {
      return this.avatar == undefined || this.avatar == "";
    },
    getUsernameFirstLetter: function() {
      return this.username.charAt(0);
    },
    getProfileBackgStyle: function() {
      return "box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);background-color:".concat(
        this.setBackgroundColor(this.username),
        ";height:",
        this.size,
        "px !important;width:",
        this.size,
        "px !important;"
      );
    }
  }
};
</script>

<style>
</style>
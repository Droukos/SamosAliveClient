<template>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text aria-label="Account">
          <v-avatar size="40" v-on="on">
            <avatar-base :username="username" :avatar="avatar" size="40"></avatar-base>
          </v-avatar>
        </v-btn>
      </template>
      <v-card class="mx-auto">
        <v-container>
            <div class="d-flex">
                <v-avatar tile size="150">
                    <avatar-base :username="username" :avatar="avatar" size="150"></avatar-base>
                </v-avatar>
                <div class="ml-2">
                    <h3></h3>
                    <h5>Kostass Dr</h5>
                </div>
                
            </div>
           
            <v-btn
            rounded
            router-link
            to="/login"
            v-text="$t('user.logout')"
            aria-label="ToLogout"
          />
            
        </v-container>
      </v-card>
    </v-menu>
</template>

<script>
export default {

components: {
  AvatarBase: () =>
      import(
       /* webpackChunkName: "AvatarBase" */ "@/components/profile/avatar/AvatarBase"
      )
},
    computed: {
        avatar() {
          return this.$store.getters.getAvatar;
        },
        username() {
          return this.$store.getters.getUsername;
        },
    }
}
</script>

<style>

</style>
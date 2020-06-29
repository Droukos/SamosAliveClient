<template>
  <v-list-item color="rgba(0, 0, 0, .4)">
     <v-list-item-content>
       <v-list-item-title class="title">{{profDat.username}}</v-list-item-title>
       <v-list-item-subtitle>{{profDat.name}} {{profDat.surname}}</v-list-item-subtitle>
     </v-list-item-content>
     <v-list-item-content>
         <v-menu>
           <template v-slot:activator="{ on }">
             <v-btn rounded v-on="on" aria-label="MoreOptions">
               {{ $t('user.more_options') }}
             </v-btn>
           </template>
           <v-list>
             <v-list-item v-for="(item, index) in moreOptions" :key="index" @click="optionClicked(item, profDat)">
               <v-list-item-title>{{ item.title }}</v-list-item-title>
             </v-list-item>
           </v-list>
         </v-menu>
       </v-list-item-content>
   </v-list-item>
</template>

<script>
export default {
  props:['profDat', 'moreOptions'],
  methods:{
    optionClicked(item, profDat) {
      if (item.index == 2) {
        this.$router.push({
          name: "userEditProfile",
          params: {
            userID: profDat.userid
          }})
      }
    }
  }
}
</script>
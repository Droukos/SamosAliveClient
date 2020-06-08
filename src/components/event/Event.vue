<template>
  <div>
    <p v-text="$t('main')"/>
    <v-btn href="#" color="primary" v-text="$t('events.event')" @click="showDialog()"/>

    <div class="text-center">
    <v-dialog
      v-model="dialog"
    >

      <v-card>
        <v-card-title
          class="light-blue darken-1"
          primary-title
        >
          <h6 v-text="$t('events.form')"/>
        </v-card-title>

        <v-card-text>
        <h5 v-text="$t('events.eventInfo')"/>
         <v-combobox
          v-model="select"
          :items="items"
        ></v-combobox>

        <h5 v-text="$t('events.address')"/>
        <v-textarea
          solo
          disabled
          label="Automati dieuthinsi"
        ></v-textarea>
        <h5 v-text="$t('events.comment')"/>
        <v-text-field
            label="*Extra info"
            solo
        ></v-text-field>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="dialog = false"
            v-text="$t('events.send')"
          >
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    
    <br><br>
    <v-btn href="#" color="primary" v-text="$t('events.eventList')" router-link to="/eventList"/>
    <v-btn href="#" color="primary" v-text="$t('events.problemList')" router-link to="/problemList"/>
    <br>
    
    <!--<span>Κατάσταση ασθενούς: {{ selected }}</span>-->
    
  </div>
  
</template>


<script>
export default {
  name: "Event",
  data () {
      return {
        dialog: false,
        select: [],
        items: [this.$t('events.eventS1'),this.$t('events.eventS2'),this.$t('events.eventS3')]
      }
    },
  template: [
  ],
  components: {
  },
  methods: {
      showDialog(){
        this.dialog= true;
      }
  },
  computed: {
    bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      }
  },
  created: function() {

  }
};

</script>
<style>
body {
  font-family: "Roboto";
}
h1 {
  text-align: center;
}
</style>
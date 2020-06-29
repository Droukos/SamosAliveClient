<template>
  <div>
    <h5 v-text="$t('events.problemListInfo')"/>
    <v-timeline dense align-top>
      <v-timeline-item
        v-for="item in getItems"
        :key="item.index"
      >
        <template v-slot:icon>
        </template>
        <span>{{item.username}}</span>
        <v-card>
          <v-card-title>{{item.header}}</v-card-title>
          <span v-text="$t('events.situation')"/>
          <p style="display: inline">{{item.description}}</p><br>
          <span v-text="$t('events.address')"/>
          <p style="display: inline">{{item.description}}</p><br>
          <span v-text="$t('events.comment')"/>
          <p style="display: inline">{{item.description}}</p><br>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    
  </div>
  
</template>


<script>
export default {
computed: {
    getItems(){
      return [
            { 
            index: 0,
            username: 'user1',
            header: 'problima1', 
            description: 'mplampla' 
            },
            { 
            index: 1,
            username: 'user2',
            header: 'problima2', 
            description: 'klp klp' 
            },
            { 
            index: 2,
            username: 'user3',
            header: this.$t('events.problemList'), 
            description: 'tade tade' 
            },
      ]
    }
}
};
</script>
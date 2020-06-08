<template>
    <v-list-item color="rgba(0, 0, 0, .4)">
        <v-list-item-content>
          <v-list-item-title class="title">{{ $t('user.information') }}</v-list-item-title>
          <v-list-item-subtitle v-if="profVis.showEmail">{{ $t('fields.email')+": " }}{{profDat.email}}</v-list-item-subtitle>
          <v-list-item-subtitle v-if="profVis.showAddress">{{ $t('fields.address')+": " }}
            <div class="d-flex flex-row">
              <span class="pr-1" ><v-img :src="getCountryImage" max-width="22"></v-img></span>
              <span>{{profDat.address}}</span>
            </div>
           </v-list-item-subtitle>
          <v-list-item-subtitle v-if="profVis.showPhone">{{ $t('fields.phone')+": " }}{{profDat.phone}}</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    props: ['profDat', 'profVis'],
    methods: {
        getCountryImage: function() {
            return "https://www.countryflags.io/".concat(
              this.profDat.country_code,
              "/flat/32.png"
            );
        },
    }
}
</script>
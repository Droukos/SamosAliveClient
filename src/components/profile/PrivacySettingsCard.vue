<template>
  <v-content>
    <p class="display-1" style="color:#00897B">{{ $t('privacy.title') }}{{ privacyForm.username }}</p>
    <v-card outlined>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="privSet in privacyForm.user_privacy"
          :key="privSet.index"
        >
          <v-expansion-panel-header>{{ $t(privSet.i18n) }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
              v-model="privSet.type"
              :items="getPrivacyTypes"
              :disabled="false"
              :readonly="false"
              chips
              item-text="preview"
              item-value="type"
              :label="$t('privacy.show_type')">
            </v-select>

            <v-autocomplete
              v-if="isNotPublicOrPrivate(privSet.type)"
              v-model="privSet.list"
              :items="users"
              :loading="isLoading"
              :search-input.sync="search"
              color="white"
              hide-no-data
              hide-selected
              item-text="Description"
              item-value="API"
              :label="$t('user.users_autocomplete')"
              :placeholder="$t('user.users_search')"
              prepend-icon="mdi-database-search"
              return-object
            ></v-autocomplete>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
       <!--<div class="justify-center mb-6 pa-3">
         <div v-for=" in " :key="">
            
              
            
         </div>
       </div>-->

    </v-card>
  </v-content>
</template>

<script>
export default {
  data: function() {
    return {
      privacyForm: {
        userID: "1",
        username: "Axilleas",
        user_privacy: [ 
          {
            index: 1,
            name: "show_online_status",
            i18n: "privacy.online_status",
            type: "",
            list: ""
          },
          {
            index: 2,
            name: "show_last_login",
            i18n: "privacy.last_login",
            type: "",
            list: ""
          },
          {
            index: 3,
            name: "show_last_logout",
            i18n: "privacy.last_logout",
            type: "",
            list: ""
          },
          {
            index: 4,
            name: "show_fullname",
            i18n: "privacy.fullname",
            type: "",
            list: ""
          },
          {
            index: 5,
            name: "show_email",
            i18n: "privacy.email",
            type: "",
            list: ""
          },
          {
            index: 6,
            name: "show_account_created",
            i18n: "privacy.account_created",
            type: "",
            list: ""
          },
          {
            index: 7,
            name: "show_description",
            i18n: "privacy.description",
            type: "",
            list: ""
          },
          {
            index: 8,
            name: "show_address",
            i18n: "privacy.address",
            type: "",
            list: ""
          },
          {
            index: 9,
            name: "show_phone",
            i18n: "privacy.phone",
            type: "",
            list: ""
          }
        ]
      },
      isLoading: false,
      users: [],
      search: null,
    };
  },
  methods: {
    isNotPublicOrPrivate(type) {
      console.log(type);
      return (type != "public" && type != "private");
    },
    querySelections (v) {
        this.isLoading = true;
        // Simulated ajax query
        setTimeout(() => {
          this.queryCountries = this.$countries.filter(e => {
            return (e.name || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          console.log(this.queryCountries);
          this.isLoading = false
        }, 800)
    }
  },
  watch: {
      search (val) {
        val && val !== this.users && this.querySelections(val)
      },
    },
  computed: {
    getPrivacyTypes() {
      return [
        {
          preview: this.$t('privacy.public'),
          type: "public"
        },
        {
          preview: this.$t('privacy.private'),
          type: "private"
        }, 
        {
          preview: this.$t('privacy.onlyto'),
          type: "onlyto"
        },
        {
          preview: this.$t('privacy.exceptto'),
          type: "exceptto"
        }]
    }
  }
};
</script>
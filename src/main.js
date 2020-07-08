import Vue from 'vue';
import store from '@/plugins/store.js';
import router from '@/plugins/router.js';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n.js';
import Main from '@/components/Main';
import VueCookies from 'vue-cookies';
import helper from "@/components/helpers/helper";

Vue.config.productionTip = false
Vue.use(helper);
Vue.use(VueCookies);

Vue.mixin({
    methods: {
        filterInfo: function(json_data) {
            return (json_data != undefined && json_data != null) ? json_data : "";
        },
    }
});

new Vue({
    store,
    router,
    i18n,
    vuetify,
    render: (createEl) => createEl(Main)
}).$mount('#app');
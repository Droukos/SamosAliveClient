import Vue from 'vue';
import store from '@/plugins/store.js';
import router from '@/plugins/router.js';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n.js';
import Main from '@/components/Main';
Vue.config.productionTip = false
Vue.use(() => import (/* webpackChunkName: "Helper" */ "@/components/helpers/helper.js"));

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
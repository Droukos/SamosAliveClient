//npm run start:dev
import Vue from 'vue';
import store from '@plugins/store.js';
import babelPolyfill from 'babel-polyfill';
import router from '@plugins/router.js';
import vuetify from '@plugins/vuetify'; // path to vuetify export
//import i18n from './src/plugins/i18n.js';

const i18n = () => import (/* webpackChunkName: "I18n" */ "@plugins/i18n.js");

Vue.use(() => import (/* webpackChunkName: "Helper" */ "@components/helpers/helper.js"));
Vue.use(() => import (/* webpackChunkName: "DateUtils" */ "@plugins/dateUtil.js"));

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
    render: (createEl) => createEl(() => import (/* webpackChunkName: "Main" */ "@components/Main.vue")),
}).$mount('#app');
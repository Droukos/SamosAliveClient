//npm run start:dev
import Vue from 'vue';
import store from './src/plugins/store.js';
import babelPolyfill from 'babel-polyfill';
import router from './src/plugins/router.js';
import vuetify from './src/plugins/vuetify'; // path to vuetify export
import i18n from './src/plugins/i18n.js';
import dateUtils from './src/plugins/dateUtil.js';
import helper from './src/components/helpers/helper.js';

Vue.use(helper);
Vue.use(dateUtils);

const Main = () => import ( /* webpackMode: "eager" */ /* webpackChunkName: "Main" */ /* webpackPreload: true */ "./src/components/Main.vue");

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
    render: (createEl) => createEl(Main),
}).$mount('#app');
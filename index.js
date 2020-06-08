//npm run start:dev
import Vue from 'vue';
import store from './plugins/store.js';
import babelPolyfill from 'babel-polyfill';
import router from './plugins/router.js';
import vuetify from './plugins/vuetify'; // path to vuetify export
import i18n from './plugins/i18n.js';
import dateUtils from './plugins/dateUtil.js';
import helper from './components/helpers/helper.js';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
Vue.use(helper);
Vue.use(dateUtils);

const Main = () => import ( /* webpackMode: "eager" */ /* webpackChunkName: "Main" */ /* webpackPreload: true */ "./components/Main.vue");

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
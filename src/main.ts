import Vue from 'vue';
import store from './store';
import router from './router';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import App from '@/views/App.vue';
import VueCookies from 'vue-cookies';
import helper from "@/plugins/helpers/helper";

Vue.config.productionTip = false
Vue.use(helper);
Vue.use(VueCookies);

new Vue({
    store,
    router,
    i18n,
    vuetify,
    render: (createEl) => createEl(App)
}).$mount('#app');
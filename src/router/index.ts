import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

Vue.config.productionTip=false;

const routes: Array<RouteConfig> = [
        {
            path: '/',
            name: "entry",
            component: () => import(/* webpackChunkName: "HomeCard" */ '@/views/routes/home/HomeCard.vue'),
        },
        {
            path: '/login',
            name: "login",
            component: () => import(/* webpackChunkName: "LoginCard" */ '@/views/routes/auth/LoginCard.vue'),
        },
        {
            path: '/search',
            name: "search",
            component: () => import(/* webpackChunkName: "SearchCard" */ '@/views/routes/search/SearchCard.vue'),
        },
        {
            path: '/profile',
            name: "profile",
            component: () => import(/* webpackChunkName: "ProfileCard" */ '@/views/routes/profile/ProfileCard.vue'),
        },
        {
            path: '/:userID/profile',
            name: "user_profile",
            component: () => import(/* webpackChunkName: "ProfileCard" */ '@/views/routes/profile/ProfileCard.vue'),
            props: true
        },
        {
            path: '/edit',
            name: "editprofile",
            component: () => import(/* webpackChunkName: "EditProfileCard" */ '@/views/routes/profile/EditProfileCard.vue'),
        },
        {
            path: '/:userID/edit',
            name: "userEditProfile",
            component: () => import(/* webpackChunkName: "EditProfileCard" */ '@/views/routes/profile/EditProfileCard.vue'),
            props: true
        },
        {
            path: '/privacy',
            name: "privacysettings",
            component: () => import(/* webpackChunkName: "PrivacySettingsCard" */ '@/views/routes/profile/PrivacySettingsCard.vue')
        },
        {
            path: '/:userID/privacy',
            name: "privacysettings",
            component: () => import(/* webpackChunkName: "PrivacySettingsCard" */ '@/views/routes/profile/PrivacySettingsCard.vue'),
            props: true
        },
        {
            path: '/news',
            name: "news",
            component: () => import(/* webpackChunkName: "NewsCard" */ '@/components/news/News.vue'),
        },
        {
            path: '/aed/event',
            name: "aedEvent",
            component: () => import(/* webpackChunkName: "EventCard" */ '@/views/routes/aed/event/EventCard.vue'),
        },
        {
            path: '/register',
            name: "register",
            component: () => import(/* webpackChunkName: "AppRegister" */ '@/views/routes/auth/RegistrationCard.vue'),
        },
        {
            path: '/settings',
            name: "settings",
            component: () => import(/* webpackChunkName: "SettingsCard" */ '@/views/routes/settings/SettingsCard.vue'),
        },
        {
            path: "/sys_admin",
            name: "sys_admin",
            component: () => import(/* webpackChunkName: "SysAdminCard" */ '@/views/routes/auth/SysAdminCard.vue'),
        }
    ];

      export default new VueRouter({
          mode: "history",
          routes
      });
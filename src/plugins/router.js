import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

Vue.config.productionTip=false;

const router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/',
            name: "entry",
            component: () => import(/* webpackChunkName: "HomeCard" */ '@/components/home/HomeCard'),
        },
        {
            path: '/login',
            name: "login",
            component: () => import(/* webpackChunkName: "LoginCard" */ '@/components/auth/LoginCard'),
        },
        {
            path: '/search',
            name: "search",
            component: () => import(/* webpackChunkName: "SearchCard" */ '@/components/search/SearchCard'),
        },
        {
            path: '/profile',
            name: "profile",
            component: () => import(/* webpackChunkName: "ProfileCard" */ '@/components/profile/ProfileCard'),
        },
        {
            path: '/:userID/profile',
            name: "user_profile",
            component: () => import(/* webpackChunkName: "ProfileCard" */ '@/components/profile/ProfileCard'),
            props: true
        },
        {
            path: '/edit',
            name: "editprofile",
            component: () => import(/* webpackChunkName: "EditProfileCard" */ '@/components/profile/EditProfileCard'),
        },
        {
            path: '/:userID/edit',
            name: "userEditProfile",
            component: () => import(/* webpackChunkName: "EditProfileCard" */ '@/components/profile/EditProfileCard'),
            props: true
        },
        {
            path: '/privacy',
            name: "privacysettings",
            component: () => import(/* webpackChunkName: "PrivacySettingsCard" */ '@/components/profile/PrivacySettingsCard')
        },
        {
            path: '/:userID/privacy',
            name: "privacysettings",
            component: () => import(/* webpackChunkName: "PrivacySettingsCard" */ '@/components/profile/PrivacySettingsCard'),
            props: true
        },
        {
            path: '/news',
            name: "news",
            component: () => import(/* webpackChunkName: "NewsCard" */ '@/components/news/News'),
        },
        {
            path: '/event',
            name: "event",
            component: () => import(/* webpackChunkName: "EventCard" */ '@/components/event/Event'),
        },
        {
            path: '/register',
            name: "register",
            component: () => import(/* webpackChunkName: "AppRegister" */ '@/components/auth/RegistrationCard'),
        },
        {
            path: '/settings',
            name: "settings",
            component: () => import(/* webpackChunkName: "SettingsCard" */ '@/components/settings/SettingsCard'),
        },
    ]
});

export default router;
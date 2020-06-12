import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

Vue.config.productionTip=false;

const router = new VueRouter({
    mode:'history',
    routes: [{
            path: '/login',
            name: "login",
            component: () => import(/* webpackChunkName: "LoginCard" */ '@components/auth/LoginCard.vue'),
        },
        {
            path: '/search',
            name: "search",
            component: () => import(/* webpackChunkName: "SearchCard" */ '@components/search/SearchCard.vue'),
        },
        {
            path: '/profile',
            name: "profile",
            component: () => import(/* webpackChunkName: "ProfileCard" */ '@components/profile/ProfileCard.vue'),
        },
        {
            path: '/:userID/profile',
            name: "user_profile",
            component: () => import(/* webpackChunkName: "ProfileCard" */ '@components/profile/ProfileCard.vue'),
            props: true
        },
        {
            path: '/',
            name: "editprofile",
            component: () => import(/* webpackChunkName: "EditProfileCard" */ '@components/profile/EditProfileCard.vue'),
        },
        {
            path: '/:userID/edit',
            name: "userEditProfile",
            component: () => import(/* webpackChunkName: "EditProfileCard" */ '@components/profile/EditProfileCard.vue'),
            props: true
        },
        {
            path: '/privacy',
            name: "privacysettings",
            component: () => import(/* webpackChunkName: "PrivacySettingsCard" */ '@components/profile/PrivacySettingsCard.vue')
        },
        {
            path: '/:userID/privacy',
            name: "privacysettings",
            component: () => import(/* webpackChunkName: "PrivacySettingsCard" */ '@components/profile/PrivacySettingsCard.vue'),
            props: true
        },
        {
            path: '/news',
            name: "news",
            component: () => import(/* webpackChunkName: "NewsCard" */ '@components/news/News.vue'),
        },
        {
            path: '/event',
            name: "event",
            component: () => import(/* webpackChunkName: "EventCard" */ '@components/event/Event.vue'),
        },
        {
            path: '/register',
            name: "register",
            component: () => import(/* webpackChunkName: "AppRegister" */ '@components/auth/RegistrationCard.vue'),
        }
    ]
});

export default router;
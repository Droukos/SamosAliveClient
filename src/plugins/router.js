import Vue from 'vue';
import VueRouter from 'vue-router';
import Event from '../components/event/Event.vue';

import News from '../components/news/News.vue';
import Login from '../components/auth/LoginCard.vue';

const Register = () => import(/* webpackChunkName: "AppRegister" */ '../components/auth/RegistrationCard.vue');
const Profile = () => import(/* webpackChunkName: "ProfileCard" */ '../components/profile/ProfileCard.vue');
const Search = () => import(/* webpackChunkName: "SearchCard" */ '../components/search/SearchCard.vue');
const EditProfile = () => import(/* webpackChunkName: "EditProfileCard" */ '../components/profile/EditProfileCard.vue');
const PrivacySettings = () => import(/* webpackChunkName: "PrivacySettingsCard" */ '../components/profile/PrivacySettingsCard.vue');

Vue.use(VueRouter);

Vue.config.productionTip=false;


const router = new VueRouter({
    mode:'history',
    routes: [{
            path: '/login',
            name: "login",
            component: Login,
        },
        {
            path: '/search',
            name: "search",
            component: Search,
        },
        {
            path: '/profile',
            name: "profile",
            component: Profile
        },
        {
            path: '/:userID/profile',
            name: "user_profile",
            component: Profile,
            props: true
        },
        {
            path: '/',
            name: "editprofile",
            component: EditProfile,
        },
        {
            path: '/:userID/edit',
            name: "userEditProfile",
            component: EditProfile,
            props: true
        },
        {
            path: '/privacy',
            name: "privacysettings",
            component: PrivacySettings
        },
        {
            path: '/:userID/privacy',
            name: "privacysettings",
            component: PrivacySettings,
            props: true
        },
        {
            path: '/news',
            name: "news",
            component: News,
        },
        {
            path: '/event',
            name: "event",
            component: Event,
        },
        {
            path: '/register',
            name: "register",
            component: Register,
        }
    ]
});

export default router;
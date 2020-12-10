import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

Vue.config.productionTip=false;

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "entry",
        component: () =>
            import(
                /* webpackChunkName: "HomeCard" */ "@/views/routes/home/HomeCard.vue"
                )
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import(
                /* webpackChunkName: "LoginCard" */ "@/views/routes/auth/LoginCard.vue"
                )
    },
    {
        path: "/search",
        name: "search",
        component: () =>
            import(
                /* webpackChunkName: "SearchCard" */ "@/views/routes/search/SearchCard.vue"
                )
    },
    {
        path: "/profile",
        name: "profile",
        component: () =>
            import(
                /* webpackChunkName: "ProfileCard" */ "@/views/routes/profile/ProfileCard.vue"
                )
    },
    {
        path: "/:userID/profile",
        name: "user_profile",
        component: () =>
            import(
                /* webpackChunkName: "ProfileCard" */ "@/views/routes/profile/ProfileCard.vue"
                ),
        props: true
    },
    //{
    //    path: '/edit',
    //    name: "editprofile",
    //    component: () => import(/* webpackChunkName: "EditProfileCard" */ '@/views/routes/profile/EditProfileCard.vue'),
    //},
    {
        path: "/:userID/edit",
        name: "editprofile",
        component: () =>
            import(
                /* webpackChunkName: "EditProfileCard" */ "@/views/routes/profile/EditProfileCard.vue"
                ),
        props: true
    },
    //{
    //    path: '/privacy',
    //    name: "privacysettings",
    //    component: () => import(/* webpackChunkName: "PrivacySettingsCard" */ '@/views/routes/profile/PrivacySettingsCard.vue')
    //},
    {
        path: "/:userID/privacy",
        name: "privacysettings",
        component: () =>
            import(
                /* webpackChunkName: "PrivacySettingsCard" */ "@/views/routes/profile/PrivacySettingsCard.vue"
                ),
        props: true
    },
    {
        path: "/aed/device/register",
        name: "registerAedDevice",
        component: () =>
            import(
                /* webpackChunkName: "RegisterAedDeviceCard" */ "@/views/routes/device/RegisterAedDeviceCard.vue"
                )
    },
    {
        path: "/aed/device/:aedDeviceId/info",
        name: "aedDeviceInfo",
        component: () =>
            import(
                /* webpackChunkName: "AedDeviceInfoCard" */ "@/views/routes/device/AedDeviceInfoCard.vue"
                ),
        props: true
    },
    {
        path: "/aed/device/:aedDeviceId/edit",
        name: "aedDeviceEdit",
        component: () =>
            import(
                /* webpackChunkName: "AedDeviceEditCard" */ "@/views/routes/device/AedDeviceEditCard.vue"
                ),
        props: true
    },
    {
        path: '/news',
        name: "news",
        component: () => import(/* webpackChunkName: "NewsCard" */ '@/views/routes/news/NewsCard.vue'),
    },
    {
        path: "/:newsID/more",
        name: "newsMore",
        component: () =>
            import(
                /* webpackChunkName: "NewsMore" */ "@/views/routes/news/NewsMoreCard.vue"
                ),
        props: true,
    },
    {
        path: '/aed/event',
        name: "aedEvent",
        component: () => import(/* webpackChunkName: "EventCard" */ '@/views/routes/aed/event/AedEventCard.vue'),
    },
    {
        path: '/aed/event/:eventID/more',
        name: "eventMore",
        component: () => import(/* webpackChunkName: "EventMore" */ '@/views/routes/aed/history/EventMoreCard.vue'),
        props: true
    },
    {
        path: '/aed/event/:eventID/channel',
        name: "aedEventChannel",
        component: () => import(/* webpackChunkName: "AedEventChannelCard" */ '@/views/routes/aed/event/AedEventChannelCard.vue'),
        props: true
    },
    {
        path: '/aed/eventLive',
        name: "eventLive",
        component: () => import(/* webpackChunkName: "EventLive" */ '@/views/routes/aed/history/EventLiveCard.vue')
    },
    {
        path: '/aed/history',
        name: "history",
        component: () => import(/* webpackChunkName: "history" */ '@/views/routes/aed/history/HistoryCard.vue'),
    },
    {
        path: '/aed/eventList',
        name: "eventList",
        component: () => import(/* webpackChunkName: "eventHistory" */ '@/views/routes/aed/history/EventListCard.vue'),
    },
    {
        path: '/aed/problemList',
        name: "problemList",
        component: () => import(/* webpackChunkName: "problemsHistory" */ '@/views/routes/aed/history/ProblemsListCard.vue'),
    },
    {
        path: '/aed/problems/:problemsID/more',
        name: "problemsMore",
        component: () => import(/* webpackChunkName: "problemsMore" */ '@/views/routes/aed/history/ProblemsMoreCard.vue'),
        props: true
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import(
                /* webpackChunkName: "AppRegister" */ "@/views/routes/auth/RegistrationCard.vue"
                )
    },
    {
        path: "/settings",
        name: "settings",
        component: () =>
            import(
                /* webpackChunkName: "SettingsCard" */ "@/views/routes/settings/SettingsCard.vue"
                )
    },
    {
        path: "/sys_admin",
        name: "sys_admin",
        component: () =>
            import(
                /* webpackChunkName: "SysAdminCard" */ "@/views/routes/auth/SysAdminCard.vue"
                )
    }
];

      export default new VueRouter({
          mode: "history",
          routes
      });
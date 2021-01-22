import Vue from "vue";
import {RawLocation, Route, RouteConfig} from "vue-router";
import Router from 'vue-router';

const originalPush = Router.prototype.push;
Router.prototype.push = async function (location: RawLocation) {
  let route: Route;
  try {
    route = await originalPush.call<Router, [RawLocation], Promise<Route>>(this, location);
  } catch (err) {
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  }

  return route!;
}

Vue.use(Router);

Vue.config.productionTip = false;

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
    path: "/admin/mixin/users",
    name: "adminMixinUsers",
    component: () =>
        import(
            /* webpackChunkName: "AdminMixinCard" */ "@/views/routes/admin/mixin/AdminMixinCard.vue"
            )
  },
  {
    path: "/admin/ban/users",
    name: "adminBanUsers",
    component: () =>
      import(
        /* webpackChunkName: "BanUsersCard" */ "@/views/routes/admin/ban/BanUsersCard.vue"
      )
  },
  {
    path: "/admin/roles/change",
    name: "adminRolesChange",
    component: () =>
        import(
            /* webpackChunkName: "RolesChangeCard" */ "@/views/routes/admin/roles/RolesChangeCard.vue"
            )
  },
  {
    path: "/admin/roles/add",
    name: "adminRolesAdd",
    component: () =>
        import(
            /* webpackChunkName: "RolesAddCard" */ "@/views/routes/admin/roles/RolesAddCard.vue"
            )
  },
  {
    path: "/admin/roles/del",
    name: "adminRolesDel",
    component: () =>
        import(
            /* webpackChunkName: "RolesDelCard" */ "@/views/routes/admin/roles/RolesDelCard.vue"
            )
  },
  {
    path: "/admin/unban/users",
    name: "adminUnbanUsers",
    component: () =>
      import(
        /* webpackChunkName: "UnbanUsersCard" */ "@/views/routes/admin/ban/UnbanUsersCard.vue"
      )
  },
  {
    path: "/admin/ban/users",
    name: "adminBanUsers",
    component: () =>
      import(
        /* webpackChunkName: "BanUsersCard" */ "@/views/routes/admin/ban/BanUsersCard.vue"
      )
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
    path: "/news/search",
    name: "newsSearchCard",
    component: () =>
      import(
        /* webpackChunkName: "newsSearchCard" */ "@/views/routes/news/NewsSearchCard.vue"
      )
  },
  {
    path: "/news/create",
    name: "newsCreate",
    component: () =>
      import(
        /* webpackChunkName: "newsCreate" */ "@/views/routes/news/NewsCreate.vue"
      )
  },
  {
    path: "/news/all",
    name: "newsAll",
    component: () =>
      import(
        /* webpackChunkName: "NewsAllCard" */ "@/views/routes/news/NewsAllCard.vue"
      )
  },
  {
    path: "/news/:newsID/more",
    name: "newsMoreCard",
    component: () =>
      import(
        /* webpackChunkName: "newsMoreCard" */ "@/views/routes/news/NewsMoreCard.vue"
      ),
    props: true
  },
  {
    path: "/aed/event",
    name: "aedEvent",
    component: () =>
      import(
        /* webpackChunkName: "AedEventCard" */ "@/views/routes/aed/event/AedEventCard.vue"
      )
  },
  {
    path: "/aed/event/create",
    name: "createAedEvent",
    component: () =>
      import(
        /* webpackChunkName: "AedEventCreateCard" */ "@/views/routes/aed/event/AedEventCreateCard.vue"
      )
  },
  {
    path: "/aed/event/:eventID/more",
    name: "eventMore",
    component: () =>
      import(
        /* webpackChunkName: "EventMore" */ "@/views/routes/aed/event/EventMoreCard.vue"
      ),
    props: true
  },
  {
    path: "/aed/event/:eventID/channel",
    name: "aedEventChannel",
    component: () =>
      import(
        /* webpackChunkName: "AedEventChannelCard" */ "@/views/routes/aed/event/AedEventChannelCard.vue"
      ),
    props: true
  },
  {
    path: "/aed/eventLive",
    name: "eventLive",
    component: () =>
      import(
        /* webpackChunkName: "EventLive" */ "@/views/routes/aed/event/EventLiveCard.vue"
      )
  },
  {
    path: "/aed/history",
    name: "history",
    component: () =>
      import(
        /* webpackChunkName: "history" */ "@/views/routes/aed/history/HistoryCard.vue"
      )
  },
  {
    path: "/aed/eventList",
    name: "eventList",
    component: () =>
      import(
        /* webpackChunkName: "eventHistory" */ "@/views/routes/aed/event/EventListCard.vue"
      )
  },
  {
    path: "/aed/problems/problemsCreate",
    name: "problemsCreate",
    component: () =>
      import(
        /* webpackChunkName: "problemsCreate" */ "@/views/routes/aed/problems/ProblemsCreateCard.vue"
      )
  },
  {
    path: "/aed/problems/problemList",
    name: "problemList",
    component: () =>
      import(
        /* webpackChunkName: "problemList" */ "@/views/routes/aed/problems/ProblemsListCard.vue"
      )
  },
  {
    path: "/aed/problems/:problemsID/more",
    name: "problemsMore",
    component: () =>
      import(
        /* webpackChunkName: "problemsMore" */ "@/views/routes/aed/problems/ProblemsMoreCard.vue"
      ),
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
    path: "/info",
    name: "info",
    component: () =>
      import(
        /* webpackChunkName: "InfoCard" */ "@/views/routes/info/InfoCard.vue"
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

export default new Router({
  mode: "history",
  routes
});

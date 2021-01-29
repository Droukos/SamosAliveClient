import Vue from "vue";
import { RawLocation, Route, RouteConfig } from "vue-router";
import Router from "vue-router";
import { comps } from "@/plugins/enums/components-dir/comps";

const originalPush = Router.prototype.push;
Router.prototype.push = async function(location: RawLocation) {
  let route: Route;
  try {
    route = await originalPush.call<Router, [RawLocation], Promise<Route>>(
      this,
      location
    );
  } catch (err) {
    if (err.name !== "NavigationDuplicated") {
      throw err;
    }
  }
  return route!;
};

Vue.use(Router);

Vue.config.productionTip = false;

const allRoutes = [
  { path: "/", name: "entry", comp: comps.HOME },
  { path: "/info", name: "info", comp: comps.INFO },
  { path: "/settings", name: "settings", comp: comps.SETTINGS },
  { path: "/sys_admin", name: "sys_admin", comp: comps.SYS_ADMIN },
  { path: "/login", name: "login", comp: comps.LOGIN },
  { path: "/register", name: "register", comp: comps.REGISTER },
  { path: "/search", name: "search", comp: comps.SEARCH },
  { path: "/profile", name: "profile", comp: comps.PROFILE },
  { path: "/:userID/profile", name: "user_profile", comp: comps.PROFILE },
  { path: "/:userID/edit", name: "editprofile", comp: comps.PROFILE_EDIT },
  {
    path: "/:userID/privacy",
    name: "privacysettings",
    comp: comps.PROFILE_PRIVACY
  },
  {
    path: "/admin/mixin/users",
    name: "adminMixinUsers",
    comp: comps.ADMIN_MIX
  },
  {
    path: "/admin/roles/change",
    name: "adminRolesChange",
    comp: comps.ADMIN_R_CH
  },
  { path: "/admin/roles/add", name: "adminRolesAdd", comp: comps.ADMIN_R_AD },
  { path: "/admin/roles/del", name: "adminRolesDel", comp: comps.ADMIN_R_DE },
  { path: "/admin/ban/users", name: "adminBanUsers", comp: comps.ADMIN_BAN },
  {
    path: "/admin/unban/users",
    name: "adminUnbanUsers",
    comp: comps.ADMIN_UNBAN
  },
  {
    path: "/aed/device/register",
    name: "registerAedDevice",
    comp: comps.AED_REG
  },
  {
    path: "/aed/device/:aedDeviceId/info",
    name: "aedDeviceInfo",
    comp: comps.AED_INFO
  },
  {
    path: "/aed/device/:aedDeviceId/edit",
    name: "aedDeviceEdit",
    comp: comps.AED_EDIT
  },
  { path: "/news/search", name: "newsSearchCard", comp: comps.NEWS_SEARCH },
  { path: "/news/create", name: "newsCreate", comp: comps.NEWS_CREATE },
  { path: "/news/all", name: "newsAll", comp: comps.NEWS_ALL },
  { path: "/news/:newsID/more", name: "newsMoreCard", comp: comps.NEWS_MORE },
  { path: "/aed/event", name: "aedEvent", comp: comps.AED_EVENT },
  { path: "/aed/event/create", name: "createAedEvent", comp: comps.AED_EV_CR },
  {
    path: "/aed/event/:eventID/more",
    name: "eventMore",
    comp: comps.AED_EV_MORE
  },
  {
    path: "/aed/event/:eventID/channel",
    name: "aedEventChannel",
    comp: comps.AED_EV_CH
  },
  { path: "/aed/eventLive", name: "eventLive", comp: comps.AED_EV_LIVE },
  { path: "/aed/history", name: "history", comp: comps.AED_HISTORY },
  { path: "/aed/eventList", name: "eventList", comp: comps.AED_PR_LIST },
  { path: "/aed/map", name: "openAedMap", comp: comps.AED_EV_MAP },
  {
    path: "/aed/problems/problemsCreate",
    name: "problemsCreate",
    comp: comps.AED_PR_CR
  },
  {
    path: "/aed/problems/problemList",
    name: "problemList",
    comp: comps.AED_PR_LIST
  },
  {
    path: "/aed/problems/:problemsID/more",
    name: "problemsMore",
    comp: comps.AED_PR_MORE
  }
];

const routes: Array<RouteConfig> = allRoutes.map(route => {
  return {
    ...route,
    component: () =>
      import(
        /* webpackChunkName: "[request]" */ `@/views/routes/${route.comp}.vue`
      ),
    props: route.name.includes(":")
  };
});

export default new Router({
  mode: "history",
  routes
});

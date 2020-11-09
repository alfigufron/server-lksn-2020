import Vue from "vue";
import VueRouter from "vue-router";
// import NProgress from "nprogress";

import { Login, Dashboard } from "@/views/module";
import { setToken } from "@/services/http-config";
import cookie from "vue-cookies";

Vue.use(VueRouter);

function checkToken() {
  let token = cookie.get("access_token");
  let access = false;

  setToken(token);
  token ? (access = true) : (access = false);

  return access;
}

function authenticated(to, from, next) {
  checkToken() ? next() : next({ name: "Login" });
}

function unauthenticated(to, from, next) {
  checkToken() ? next({ name: "Dashboard" }) : next();
}

const routes = [
  {
    path: "/",
    name: "Login",
    beforeEnter: unauthenticated,
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    beforeEnter: authenticated,
    component: Dashboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeResolve(to => {
//   if (to.name) NProgress.start();
// });

// router.afterEach(() => {
//   NProgress.done();
// });

export default router;

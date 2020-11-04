import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";

import { Profile } from "@/services/auth";
import { http } from "@/services/config-http";

import { LoginPage, DashboardAdmin, ResetPassword } from "@/views/module";

import "../../node_modules/nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
    meta: {
      unauthenticated: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardAdmin,
    meta: {
      authenticated: true
    }
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    meta: {
      authenticated: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

async function Auth() {
  const token = localStorage.getItem("access_token");
  if (token) http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  var res = await Profile();
  return res != 401 ? true : false;
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.unauthenticated)) {
    (await Auth()) ? next({ name: "Dashboard" }) : next();
  } else if (to.matched.some(record => record.meta.authenticated)) {
    (await Auth()) ? next() : next({ name: "Login" });
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  if (to.name) NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

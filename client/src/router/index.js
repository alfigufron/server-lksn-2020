import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import jwt_decode from "jwt-decode";

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
      Unauthenticated: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardAdmin,
    meta: {
      Authenticated: true
    }
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    meta: {
      ResetPassword: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

var def_pass = false;

async function Auth() {
  const token = localStorage.getItem("access_token");
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const res = await Profile();
  if (res != 401) {
    var payload = jwt_decode(token);
    def_pass = payload.def_pass == 1 ? true : false;

    return true;
  } else {
    return false;
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.Unauthenticated)) {
    if (await Auth()) {
      def_pass ? next({ name: "ResetPassword" }) : next({ name: "Dashboard" });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.Authenticated)) {
    if (await Auth()) {
      if (def_pass) {
        next({ name: "ResetPassword" });
      } else {
        next();
      }
    } else {
      next({ name: "Login" });
    }
  } else if (to.matched.some(record => record.meta.ResetPassword)) {
    if (await Auth()) {
      next();
    } else {
      next({ name: "Login" });
    }
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

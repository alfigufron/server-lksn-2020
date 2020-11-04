import Vue from "vue";
import VueRouter from "vue-router";

import { Profile } from "@/services/auth";
import { http } from "@/services/config-http";

import { LoginPage, DashboardAdmin } from "@/views/module";

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
    path: "/admin/dashboard",
    name: "DashboardAdmin",
    component: DashboardAdmin,
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
    (await Auth()) ? next({ name: "DashboardAdmin" }) : next();
  } else if (to.matched.some(record => record.meta.authenticated)) {
    (await Auth()) ? next() : next({ name: "Login" });
  } else {
    next();
  }
});

export default router;

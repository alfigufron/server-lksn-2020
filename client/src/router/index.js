import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
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

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("AuthToken");

  if (to.matched.some(record => record.meta.unauthenticated)) {
    token != null ? next({ name: "DashboardAdmin" }) : next();
  } else if (to.matched.some(record => record.meta.authenticated)) {
    token == null ? next({ name: "Login" }) : next();
  } else {
    next();
  }
});

export default router;

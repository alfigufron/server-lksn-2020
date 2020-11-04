<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <br />
    <router-link :to="{ name: 'ResetPassword' }">Ubah Password</router-link>
    <br />
    <br />
    <button @click="Logout()">Logout</button>
  </div>
</template>

<script>
import { AuthLogout } from "@/services/auth";
import NProgress from "nprogress";

export default {
  title: "Dashboard",

  name: "Dashboard",

  data() {
    return {
      onSubmit: false
    };
  },

  methods: {
    async Logout() {
      if (this.onSubmit == false) {
        this.onSubmit = true;
        NProgress.start();

        let res = await AuthLogout();
        this.onSubmit = false;
        NProgress.done();
        if (res == 200 || res == 401) this.BackLogin();
      }
    },

    BackLogin() {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

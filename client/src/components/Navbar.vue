<template>
  <nav class="navbar">
    <div class="container">
      <div class="brand-logo">
        <i class="ri-checkbox-circle-line"></i>
        <h1>Pilih Yuk</h1>
      </div>
      <div class="menu">
        <ul>
          <li v-if="url != 'reset-password'">
            <router-link class="nav-link" :to="{ name: 'ResetPassword' }">
              <i class="ri-key-2-line"></i>
              Ubah Password
            </router-link>
          </li>
          <li>
            <button class="nav-link" @click="Logout()">
              <i class="ri-logout-circle-r-line"></i>
              Keluar
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import NProgress from "nprogress";

import { AuthLogout } from "@/services/auth";

export default {
  props: ["url"],
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
        if (res == 200 || res == 401) this.BackLogin();
      }
    },

    BackLogin() {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

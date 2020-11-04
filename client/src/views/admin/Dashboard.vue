<template>
  <div class="dashboard-admin">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <h1>Dashboard Admin</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { AuthLogout } from "@/services/auth";
import { vueTopprogress } from "vue-top-progress";

export default {
  name: "Dashboard",

  data() {
    return {
      onSubmit: false
    };
  },

  components: {
    vueTopprogress
  },

  methods: {
    async logout() {
      if (this.onSubmit == false) {
        this.onSubmit = true;
        this.$refs.topProgress.start();

        let res = await AuthLogout();
        this.onSubmit = false;
        this.$refs.topProgress.done();
        if (res == 200 || res == 401) this.backLogin();
      }
    },

    backLogin() {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

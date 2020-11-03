<template>
  <div class="dashboard-admin">
    <h1>Dashboard Admin</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { AuthLogout } from "@/services/auth";

export default {
  name: "Dashboard",

  methods: {
    async logout() {
      let res = await AuthLogout();
      if (res == 200) this.$router.push("/");
    }
  }
};
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <a href="#" @click.prevent="Logout()">Kembali</a>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Dashboard",
  methods: {
    ...mapActions("auth", ["Logout"])
  }
};
</script>

<template>
  <div class="dashboard">
    <Navbar></Navbar>
    <div class="container">
      <FAB v-if="role === 'A'"></FAB>
    </div>
  </div>
</template>

<script>
import { Navbar, FAB } from "@/components/module";

export default {
  title: "Dashboard",
  name: "Dashboard",
  components: {
    Navbar,
    FAB
  },
  data() {
    return {
      role: localStorage.getItem("access_guard")
    };
  }
};
</script>

<template>
  <div class="dashboard">
    <b-container class="pt-5">
      <b-row>
        <b-col md="4">
          <b-card border-variant="light" class="shadow text-center">
            <b-avatar size="4rem" class="my-3"></b-avatar>
            <h5 class="font-weight-bold">Muhammad Alfi Gufron</h5>
            <h6 class="text-muted font-weight-bold">Divisi IT</h6>

            <b-button variant="secondary" class="btn-block mt-5">
              Ubah Password
            </b-button>
            <b-button
              variant="danger"
              @click="Logout()"
              :disabled="isLoading"
              class="btn-block mt-2"
            >
              <span v-if="!isLoading">Keluar</span>
              <b-spinner small v-if="isLoading"></b-spinner>
            </b-button>
          </b-card>
        </b-col>
        <b-col md="8">
          <h1>Test</h1>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import { Navbar } from "@/components/module";

import { mapState, mapActions } from "vuex";

export default {
  name: "Dashboard",
  components: {},
  computed: {
    ...mapState(["isLoading"])
  },
  methods: {
    ...mapActions("auth", ["Logout"])
  }
};
</script>

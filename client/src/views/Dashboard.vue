<template>
  <div class="dashboard">
    <Navbar></Navbar>
    <div class="container">
      <CreatePoll
        :trigger="CreatePollModal"
        @CloseCreatePollModal="CloseCreatePollModal()"
        @RenderComponent="RenderComponent()"
      ></CreatePoll>

      <PollData v-if="!renderComponent"></PollData>

      <button v-if="role === 'A'" @click="ModalCreate()" class="fab">
        <i class="ri-add-fill"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { Navbar, PollData, CreatePoll } from "@/components/module";
import { getGuard } from "@/services/config-http";

import NProgress from "nprogress";

export default {
  title: "Dashboard",

  name: "Dashboard",

  components: {
    Navbar,
    PollData,
    CreatePoll
  },

  data() {
    return {
      role: getGuard(),
      renderComponent: false,
      CreatePollModal: false
    };
  },

  created() {
    this.RenderComponent();
  },

  methods: {
    RenderComponent() {
      NProgress.start();
      this.renderComponent = true;
      this.$nextTick(() => {
        this.renderComponent = false;
      });
      NProgress.done();
    },

    ModalCreate() {
      !this.CreatePollModal
        ? (this.CreatePollModal = true)
        : (this.CreatePollModal = false);
    },

    CloseCreatePollModal() {
      this.CreatePollModal = false;
    }
  }
};
</script>

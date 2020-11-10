<template>
  <div class="login" :style="styleBody">
    <ModalAlert
      :show="show"
      :icon="icon"
      :text="text"
      :title="title"
    ></ModalAlert>

    <b-container class="vh-100 d-flex">
      <b-row align-v="center" class="w-100 d-flex">
        <b-col md="7" class="text-center">
          <img
            class="w-100"
            src="@/assets/characters/boy-with-tablet.png"
            alt="boy-with-tablet"
          />
        </b-col>
        <b-col md="5" align-v="center" class="card-login">
          <h1 class="card-title font-weight-bold">
            Selamat Datang
          </h1>
          <p>
            Halo! Kamu harus login dulu ya, biar dapet akses masuk dan voting
          </p>
          <form @submit.prevent="Login()" class="text-left mt-4">
            <b-form-group label="Username">
              <b-form-input v-model="username" type="text"></b-form-input>
            </b-form-group>

            <b-form-group label="Password">
              <b-form-input v-model="password" type="password"></b-form-input>
            </b-form-group>

            <b-button
              variant="secondary"
              :disabled="isLoading"
              type="submit"
              class="btn-block"
            >
              <span v-if="!isLoading">Masuk</span>
              <b-spinner small v-if="isLoading"></b-spinner>
            </b-button>
          </form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { mapFields } from "vuex-map-fields";

import { ModalAlert } from "@/components/module";

export default {
  name: "Login",
  computed: {
    ...mapState(["isLoading"]),
    ...mapFields("auth", ["data.username", "data.password"]),
    ...mapFields(["modal.show", "modal.icon", "modal.title", "modal.text"])
  },
  methods: {
    ...mapActions("auth", ["Login"])
  },
  components: {
    ModalAlert
  },
  data() {
    return {
      styleBody: {
        backgroundImage: `url(${require("@/assets/background/login.png")})`
      }
    };
  }
};
</script>

<style lang="scss">
.login {
  background-size: cover;
  background-repeat: no-repeat;
}

.card-login {
  padding-right: 40px !important;
}
</style>

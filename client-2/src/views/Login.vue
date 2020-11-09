<template>
  <div class="login container vh-100 d-flex">
    <ModalAlert
      :show="show"
      :icon="icon"
      :text="text"
      :title="title"
    ></ModalAlert>

    <div class="row w-100 justify-content-center align-self-center">
      <div class="col-md-5">
        <div class="card shadow text-center">
          <img class="card-img-top" src="holder.js/100px180/" alt="" />
          <div class="card-body">
            <h2 class="card-title font-weight-bold">
              Masuk
            </h2>

            <form @submit.prevent="Login()" class="text-left mt-4">
              <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="username" />
              </div>

              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                />
              </div>

              <button
                type="submit"
                class="btn btn-secondary btn-block"
                :disabled="isLoading"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
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
  }
};
</script>

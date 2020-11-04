<template>
  <div
    class="login-page"
    :style="{
      backgroundImage: 'url(' + require('@/assets/background/login.png') + ')'
    }"
  >
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <img
            src="../assets/characters/boy-with-tablet.png"
            alt="boy-with-tablet"
          />
        </div>

        <div class="col-md-5">
          <div class="login">
            <h1 class="greeting">Selamat Datang</h1>
            <p>
              Halo! Kamu harus login dulu ya, biar dapat akses buat ikut voting.
            </p>

            <form>
              <div class="group-input">
                <label>Username</label>
                <input type="text" v-model="data.username" />
              </div>

              <div class="group-input">
                <label>Password</label>
                <input type="password" v-model="data.password" />
              </div>

              <button type="submit" @click.prevent="login">Masuk</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthLogin } from "@/services/auth";
import { vueTopprogress } from "vue-top-progress";

export default {
  title: "Log In",
  name: "Login",
  data: function() {
    return {
      data: {
        username: "",
        password: ""
      },
      onSubmit: false
    };
  },
  components: {
    vueTopprogress
  },
  methods: {
    async login() {
      if (this.onSubmit == false) {
        this.onSubmit = true;

        if (this.data.username == "" || this.data.password == "") {
          this.$fire({
            title: "Peringatan",
            text: "Username atau password tidak boleh kosong!",
            type: "warning"
          });
        } else {
          this.$refs.topProgress.start();

          let res = await AuthLogin(this.data);

          if (res == 200) this.$router.push({ name: "DashboardAdmin" });
          if (res == 401) {
            this.$fire({
              title: "Gagal Masuk",
              text: "Username atau password salah!",
              type: "error"
            });

            this.data.password = "";
          }
        }

        this.onSubmit = false;
        this.$refs.topProgress.done();
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/main.scss";
</style>

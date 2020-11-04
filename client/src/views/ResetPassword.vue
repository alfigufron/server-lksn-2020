<template>
  <div>
    <Navbar url="reset-password"></Navbar>
    <div class="container reset-password">
      <h1>Reset Password</h1>
      <br />
      <form>
        <div class="group-input">
          <label>Password Lama</label>
          <input type="password" v-model="data.old_password" />
        </div>
        <div class="group-input">
          <label>Password Baru</label>
          <input type="password" v-model="data.new_password" />
        </div>
        <div class="group-input">
          <label>Konfirmasi Password Baru</label>
          <input type="password" v-model="data.confirm_new_password" />
        </div>
        <button
          type="submit"
          @click.prevent="ResetPassword()"
          v-bind:class="{ 'btn-disable': onSubmit }"
        >
          Simpan
        </button>
      </form>
      <br />
      <router-link
        v-if="def_pass === false"
        :to="{ name: 'Dashboard' }"
        class="btn btn-block"
      >
        Kembali
      </router-link>
    </div>
  </div>
</template>

<script>
import NProgress from "nprogress";
import jwt_decode from "jwt-decode";

import { ResetPassword } from "@/services/auth";
import { Navbar } from "@/components/module";

export default {
  title: "Lupa Password",
  name: "ResetPassword",
  components: {
    Navbar
  },
  data() {
    return {
      data: {
        old_password: "",
        new_password: "",
        confirm_new_password: ""
      },
      onSubmit: false,
      def_pass: false
    };
  },
  created() {
    const token = localStorage.getItem("access_token");
    const payload = jwt_decode(token);

    payload.def_pass == 1 ? (this.def_pass = true) : (this.def_pass = false);
  },
  methods: {
    async ResetPassword() {
      if (this.onSubmit == false) {
        this.onSubmit = true;

        if (this.data.old_password == "" || this.data.new_password == "") {
          this.$fire({
            title: "Peringatan",
            text: "Kolom password tidak boleh kosong!",
            type: "warning"
          });
        } else if (this.data.new_password != this.data.confirm_new_password) {
          this.$fire({
            title: "Peringatan",
            text: "Konfirmasi password baru tidak sama!",
            type: "warning"
          });
        } else {
          NProgress.start();

          let res = await ResetPassword(this.data);
          if (res == 200) {
            this.$fire({
              title: "Sukses",
              text: "Password berhasil diubah! Kamu harus login lagi",
              type: "success"
            }).then(() => {
              this.$router.push({ name: "Login" });
            });
          } else if (res == 422) {
            this.$fire({
              title: "Gagal",
              text: "Password lama yang anda masukan salah!",
              type: "error"
            });
            NProgress.done();
          } else if (res == 401) {
            this.$router.push({ name: "Login" });
          }
        }

        this.onSubmit = false;
      }
    }
  }
};
</script>

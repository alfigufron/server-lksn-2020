<template>
  <div class="reset-password">
    <div class="container">
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
        <button type="submit" @click.prevent="ResetPassword()">Simpan</button>
      </form>
      <br />
      <router-link :to="{ name: 'Dashboard' }">Kembali</router-link>
    </div>
  </div>
</template>

<script>
import { ResetPassword } from "@/services/auth";
import NProgress from "nprogress";

export default {
  title: "Lupa Password",

  name: "ResetPassword",

  data() {
    return {
      data: {
        old_password: "",
        new_password: ""
      },
      onSubmit: false
    };
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
          } else if (res == 401) {
            this.$router.push({ name: "Login" });
          }
        }

        NProgress.done();
        this.onSubmit = false;
      }
    }
  }
};
</script>

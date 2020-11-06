<template>
  <div class="poll-data">
    <div class="title">
      <h1>Data Voting</h1>
    </div>

    <div class="row">
      <div class="col-md-12" v-for="(poll, index) in polls" :key="index">
        <div class="data card shadow bordered">
          <div class="row">
            <div class="col-md-10">
              <h1 class="poll-title">{{ poll.title }}</h1>
              <p>{{ poll.description }}</p>

              <div class="deadline">
                <i class="ri-timer-line"></i>
                <h5>{{ poll.deadline | moment("DD-MM-YYYY | HH:mm") }}</h5>
              </div>
            </div>
            <div class="col-md-2 option">
              <div>
                <button class="btn-sm">
                  <i class="ri-bar-chart-box-line"></i>
                </button>
              </div>

              <div>
                <button
                  class="btn-sm btn-danger"
                  @click="ConfirmDelete(poll.id)"
                  v-bind:class="{ 'btn-disable': onSubmit }"
                >
                  <i class="ri-delete-bin-6-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Data, Delete } from "@/services/polling";

import NProgress from "nprogress";

require("vue-moment");

export default {
  data() {
    return {
      polls: [],
      onSubmit: false
    };
  },

  created() {
    this.Data();
  },

  methods: {
    async Data() {
      this.polls = await Data();
    },

    ConfirmDelete(id) {
      this.$confirm(
        "Anda akan menghapus data tersebut",
        "Apakan Anda Yakin?",
        "warning"
      ).then(() => {
        this.Delete(id);
      });
    },

    async Delete(id) {
      if (this.onSubmit == false) {
        NProgress.start();
        this.onSubmit = true;

        const res = await Delete(id);
        if (res == 401) {
          this.$fire({
            title: "Gagal",
            text: "Sesi anda telah habis! silahkan login lagi",
            type: "error"
          }).then(() => {
            this.$router.push({ name: "Login" });
          });
        } else if (res == 404) {
          this.$fire({
            title: "Gagal",
            text: "Data tidak ditemukan",
            type: "error"
          });
        } else if (res == 200) {
          this.$fire({
            title: "Sukses",
            text: "Voting berhasil ditambahkan!",
            type: "success"
          });
        }

        this.Data();
        this.onSubmit = false;
        NProgress.done();
      }
    }
  }
};
</script>

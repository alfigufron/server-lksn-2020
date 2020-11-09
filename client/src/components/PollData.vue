<template>
  <div>
    <div class="poll-data">
      <div class="title">
        <h1>Data Voting</h1>
      </div>

      <div class="row" v-if="polls.length != 0">
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
                  <button class="btn-sm" @click="Detail(poll.id)">
                    <i class="ri-bar-chart-box-line"></i>
                  </button>
                </div>

                <div v-if="role == 'A'">
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

      <div class="row" v-else>
        <div class="col-md-12 null-data">
          <span v-if="onLoad == true">Loading</span>
          <span v-if="onLoad == false">Tidak ada data</span>
        </div>
      </div>
    </div>

    <DetailPoll
      :trigger="DetailPollModal"
      :dataId="DetailId"
      @CloseDetailPollModal="CloseDetailPollModal()"
    ></DetailPoll>
  </div>
</template>

<script>
import { Data, Delete } from "@/services/polling";
import { getGuard } from "@/services/config-http";

import NProgress from "nprogress";

require("vue-moment");

export default {
  name: "PollData",

  components: {
    DetailPoll: () => import("@/components/modal/DetailPoll.vue")
  },

  data() {
    return {
      polls: [],
      onSubmit: false,
      onLoad: false,
      DetailPollModal: false,
      DetailId: 0,
      role: getGuard()
    };
  },

  created() {
    this.Data();
  },

  methods: {
    async Data() {
      this.onLoad = true;
      this.polls = await Data();
      this.onLoad = false;
    },

    Detail(id) {
      !this.DetailPollModal
        ? (this.DetailPollModal = true)
        : (this.DetailPollModal = false);
      this.DetailId = id;
    },

    CloseDetailPollModal() {
      this.DetailPollModal = false;
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
            text: "Voting berhasil dihapus!",
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

<template>
  <sweet-modal ref="modal" :blocking="true" :hide-close-button="true">
    <div class="detail-poll">
      <h1>Detail Voting</h1>

      <div class="data" v-if="data">
        <div class="choice" v-for="(key, item) in data.result" :key="item">
          <h2>{{ key }}%</h2>
          <h3>{{ item }}</h3>
        </div>
      </div>

      <div class="data" v-else>
        <h5>Tidak Ada</h5>
      </div>

      <button @click="Close" class="btn-block btn-danger">
        Tutup
      </button>
    </div>
  </sweet-modal>
</template>

<script>
import { Detail } from "@/services/polling";

export default {
  name: "DetailPoll",

  props: {
    trigger: Boolean,
    dataId: Number
  },

  watch: {
    trigger: function(val) {
      val ? this.$refs.modal.open() : this.$refs.modal.close();
    },

    dataId: function(val) {
      this.GetData(val);
    }
  },

  data() {
    return {
      data: {}
    };
  },

  methods: {
    Close() {
      this.$emit("CloseDetailPollModal");
      this.data = {};
    },

    async GetData(id) {
      const res = await Detail(id);

      if (res.status == 401) {
        this.Close();
        this.$fire({
          title: "Gagal",
          text: "Sesi anda telah habis! silahkan login lagi",
          type: "error"
        }).then(() => {
          this.$router.push({ name: "Login" });
        });
      } else if (res.status == 404) {
        this.Close();
        this.$fire({
          title: "Gagal",
          text: "Detail data ditemukan",
          type: "error"
        });
      } else if (res.status == 200) {
        this.data = res.data;
      }
    }
  }
};
</script>

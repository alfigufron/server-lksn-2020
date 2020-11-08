<template>
  <sweet-modal ref="modal" :blocking="true" :hide-close-button="true">
    <div class="detail-poll">
      <h1>Detail Voting</h1>

      <div class="data">
        <div class="choice" v-for="(key, item) in data" :key="key">
          <h2>{{ key }}</h2>
          <h3>{{ item }}</h3>
        </div>
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
    },

    async GetData(id) {
      const res = await Detail(id);
      this.data = res;
      console.log(res);
    }
  }
};
</script>

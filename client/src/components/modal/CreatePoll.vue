<template>
  <sweet-modal ref="modal" :blocking="true" :hide-close-button="true">
    <div class="create-poll">
      <h1>Tambah Voting</h1>
      <form>
        <div class="group-input">
          <label>Judul</label>
          <input type="text" v-model="data.title" />
        </div>

        <div class="group-input" v-if="data.title != ''">
          <label>Deskripsi</label>
          <textarea rows="3" v-model="data.description"></textarea>
        </div>

        <div
          class="group-input"
          v-if="data.title != '' && data.description != ''"
        >
          <label>Batas Waktu</label>
          <VueCtkDateTimePicker
            :inline="true"
            color="#394867"
            format="YYYY-MM-DD HH:mm"
            :noKeyboard="true"
            v-model="data.deadline"
          />
        </div>

        <div
          class="group-input"
          v-if="
            data.title != '' && data.description != '' && data.deadline != ''
          "
        >
          <label>Opsi</label>
          <div
            class="option"
            v-for="(choice, index) in data.choices"
            :key="index"
          >
            <input type="text" v-model="data.choices[index]" />

            <button
              class="add"
              v-if="
                data.choices.length - 1 == index &&
                  choice != '' &&
                  data.deadline != '' &&
                  data.description != '' &&
                  data.title != ''
              "
              @click.prevent="AddChoice()"
            >
              <i class="ri-add-circle-line"></i>
            </button>

            <button
              class="delete"
              v-if="data.choices.length - 1 != index"
              @click.prevent="DeleteChoice()"
            >
              <i class="ri-delete-bin-6-line"></i>
            </button>
          </div>
        </div>

        <span class="text-error" v-if="formatInvalid">
          <i class="ri-error-warning-line"></i>
          Format data yang dikirm tidak sesuai
        </span>

        <button
          type="submit"
          v-if="data.choices.length >= 2 && data.choices[1] != ''"
          @click.prevent="Create()"
          v-bind:class="{ 'btn-disable': onSubmit }"
        >
          Simpan
        </button>
        <button @click.prevent="Close()" class="btn-block btn-danger">
          Batal
        </button>
      </form>
    </div>
  </sweet-modal>
</template>

<script>
import { Create } from "@/services/polling";

import NProgress from "nprogress";

export default {
  name: "CreatePoll",

  props: {
    trigger: Boolean
  },

  watch: {
    trigger: function(val) {
      val ? this.$refs.modal.open() : this.$refs.modal.close();
    }
  },

  data() {
    return {
      data: {
        title: "",
        description: "",
        deadline: "",
        choices: [""]
      },
      onSubmit: false,
      formatInvalid: false
    };
  },

  methods: {
    Close() {
      this.$emit("CloseCreatePollModal");
    },

    DefaultData() {
      this.data.title = "";
      this.data.description = "";
      this.data.deadline = "";
      this.data.choices = [""];
    },

    AddChoice() {
      this.data.choices.push("");
    },

    DeleteChoice(index) {
      this.data.choices.splice(index, 1);
    },

    async Create() {
      if (this.onSubmit == false) {
        this.onSubmit = true;
        NProgress.start();

        const res = await Create(this.data);
        if (res == 401) {
          this.CloseCreatePoll();
          this.$fire({
            title: "Gagal",
            text: "Sesi anda telah habis! silahkan login lagi",
            type: "error"
          }).then(() => {
            this.$router.push({ name: "Login" });
          });
        } else if (res == 422) {
          this.formatInvalid = true;
        } else if (res == 200) {
          this.formatInvalid = false;
          this.Close();
          this.DefaultData();
          this.$emit("RenderComponent");

          this.$fire({
            title: "Sukses",
            text: "Voting berhasil ditambahkan!",
            type: "success"
          });
        }
        this.onSubmit = false;
        NProgress.done();
      }
    }
  }
};
</script>

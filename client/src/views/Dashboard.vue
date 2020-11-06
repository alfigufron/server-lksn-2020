<template>
  <div class="dashboard">
    <Navbar></Navbar>
    <div class="container">
      <sweet-modal ref="CreatePoll" :pulse-on-block="false" :blocking="true">
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
              v-if="data.description != '' && data.title != ''"
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
                data.deadline != '' &&
                  data.description != '' &&
                  data.title != ''
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
                  v-if="data.choices.length - 1 != index"
                  class="delete"
                  @click.prevent="DeleteChoice(index)"
                >
                  <i class="ri-delete-bin-6-line"></i>
                </button>

                <button
                  v-if="
                    data.choices.length - 1 == index &&
                      choice != '' &&
                      data.deadline != '' &&
                      data.description != '' &&
                      data.title != ''
                  "
                  class="add"
                  @click.prevent="AddChoice()"
                >
                  <i class="ri-add-circle-line"></i>
                </button>
              </div>
            </div>

            <span v-if="formatInvalid" class="text-error">
              <i class="ri-error-warning-line"></i>
              Format data yang dikirim tidak sesuai
            </span>

            <button
              type="submit"
              v-if="data.choices.length >= 2 && data.choices[1] != ''"
              @click.prevent="Create()"
              v-bind:class="{ 'btn-disable': onSubmit }"
            >
              Simpan
            </button>
          </form>
        </div>
      </sweet-modal>

      <PollData v-if="!renderComponent"></PollData>

      <button v-if="role === 'A'" @click="CreatePoll()" class="fab">
        <i class="ri-add-fill"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { Navbar, PollData } from "@/components/module";
import { getGuard } from "@/services/config-http";
import { Create } from "@/services/polling";

import NProgress from "nprogress";

export default {
  title: "Dashboard",
  name: "Dashboard",
  components: {
    Navbar,
    PollData
  },
  data() {
    return {
      role: getGuard(),
      data: {
        title: "",
        description: "",
        deadline: "",
        choices: [""]
      },
      onSubmit: false,
      formatInvalid: false,
      renderComponent: false
    };
  },
  created() {
    this.RenderComponent();
  },
  methods: {
    RenderComponent() {
      NProgress.start();
      this.renderComponent = true;
      this.$nextTick(() => {
        this.renderComponent = false;
      });
      NProgress.done();
    },

    CreatePoll() {
      this.$refs.CreatePoll.open();
    },

    CloseCreatePoll() {
      this.$refs.CreatePoll.close();
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
          this.CloseCreatePoll();
          this.DefaultData();
          this.RenderComponent();

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

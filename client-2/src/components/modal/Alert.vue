<template>
  <sweet-modal
    ref="modal"
    :icon="icon"
    :blocking="true"
    :hide-close-button="true"
  >
    <div class="text">
      <h3 class="title font-weight-bold">{{ title }}</h3>
      <h5 class="description">{{ text }}</h5>
    </div>

    <button class="btn btn-secondary" @click="hideModal()">
      Oke
    </button>
  </sweet-modal>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "modal",
  props: {
    show: Boolean,
    icon: String,
    text: String,
    title: String
  },
  watch: {
    show: function(val) {
      val ? this.$refs.modal.open() : this.$refs.modal.close();
    }
  },
  methods: {
    ...mapMutations(["hideModal"])
  }
};
</script>

<style lang="scss">
.sweet-modal {
  width: 40% !important;

  &.is-alert {
    .sweet-content {
      padding: 40px 0 !important;

      .text {
        margin: auto;
        width: 80%;

        .title {
          padding-bottom: 10px;
        }

        .description {
          padding-bottom: 20px;
        }
      }

      button {
        display: block;
        margin: auto;
        padding: 0.4rem 1.5rem;
        font-size: 1.2rem;
      }
    }
  }
}
</style>

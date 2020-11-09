import Vue from "vue";
import Vuex from "vuex";

import Auth from "./module/auth";
import Modal from "./module/modal";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  modules: {
    auth: Auth,
    modal: Modal
  }
});

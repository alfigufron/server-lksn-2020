import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVue } from "bootstrap-vue";
import SweetModal from "sweet-modal-vue/src/plugin.js";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(SweetModal);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

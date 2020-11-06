import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import titleMix from "./mixins/title";

import VueSimpleAlert from "vue-simple-alert";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import SweetModal from "sweet-modal-vue/src/plugin.js";

import "remixicon/fonts/remixicon.css";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);
Vue.use(SweetModal);

Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);

Vue.mixin(titleMix);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

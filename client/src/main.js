import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import titleMix from "./mixins/title";

import VueSimpleAlert from "vue-simple-alert";

import "remixicon/fonts/remixicon.css";

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);
Vue.mixin(titleMix);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

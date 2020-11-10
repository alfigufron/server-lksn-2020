import { getField, updateField } from "vuex-map-fields";
import { http, getStatusCode, setToken } from "@/services/http-config";
import router from "@/router";
import cookie from "vue-cookies";

const Auth = {
  namespaced: true,
  state: {
    data: {
      username: "",
      password: ""
    },
    token: cookie.get("access_token") || ""
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    updateToken(state, token) {
      state.data.token = token;
    },
    defaultData(state) {
      state.data.password = "";
      state.data.token = "";
    }
  },
  actions: {
    async Login({ state, commit, rootState }) {
      if (state.data.username == "" || state.data.password == "") {
        commit(
          "showModal",
          {
            icon: "warning",
            title: "Gagal",
            text: "Username atau Password tidak boleh kosong"
          },
          { root: true }
        );

        return;
      }

      try {
        rootState.isLoading = true;
        let res = await http.post("auth/login", state.data);
        let data = res.data;

        cookie.set(
          "access_token",
          data.access_token,
          60 * 5,
          "/",
          window.location.hostname,
          true
        );
        commit("updateToken", data.access_token);
        setToken(data.access_token);

        rootState.isLoading = false;
        router.push({ name: "Dashboard" });

        return;
      } catch (err) {
        if (getStatusCode(err)) {
          let status = getStatusCode(err);

          if (status == 401) {
            commit(
              "showModal",
              {
                icon: "error",
                title: "Gagal",
                text: "Username atau password salah"
              },
              { root: true }
            );
            return (rootState.isLoading = false);
          }
        }

        alert("Server Error");
      }
    },

    async Logout({ rootState, commit }) {
      try {
        rootState.isLoading = true;

        await http.post("auth/logout");

        cookie.remove("access_token");
        commit("defaultData");

        rootState.isLoading = false;
        router.push({ name: "Login" });
        return;
      } catch (err) {
        if (getStatusCode(err)) {
          let status = getStatusCode(err);

          if (status == 401) {
            router.push({ name: "Login" });
            commit(
              "showModal",
              {
                icon: "error",
                title: "Tidak memiliki akses",
                text: "Anda harus login terlebih dahulu"
              },
              { root: true }
            );
            return (rootState.isLoading = false);
          }
        }
      }

      alert("Server Error");
    }
  }
};

export default Auth;

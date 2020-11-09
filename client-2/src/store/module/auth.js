import { getField, updateField } from "vuex-map-fields";
import { http, getStatusCode } from "@/services/http-config";

const Auth = {
  namespaced: true,
  state: {
    data: {
      username: "",
      password: ""
    },
    token: ""
  },
  getters: {
    getField
  },
  mutations: {
    updateField
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

      rootState.isLoading = true;

      try {
        let res = await http.post("auth/login", state.data);

        return res;
      } catch (err) {
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
          return;
        } else {
          alert("Server Error");
        }
      }

      rootState.isLoading = false;
    }
  }
};

export default Auth;

import { getField, updateField } from "vuex-map-fields";

const Modal = {
  state: {
    modal: {
      show: false,
      icon: "",
      title: "",
      text: ""
    }
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    showModal(state, data) {
      state.modal.show = true;
      state.modal.icon = data.icon;
      state.modal.title = data.title;
      state.modal.text = data.text;
    },
    hideModal(state) {
      state.modal.show = false;
      state.modal.icon = "";
      state.modal.title = "";
      state.modal.text = "";
    }
  }
};

export default Modal;

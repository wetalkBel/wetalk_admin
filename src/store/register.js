import axios from "axios";
import router from '../Routes';

export default {
  namespaced: true,
  state: {
    isFetching: false,
    errorMessage: ''
  },
  mutations: {
    REGISTER_REQUEST(state) {
      state.isFetching = true;
    },
    REGISTER_SUCCESS(state) {
      state.isFetching = false;
      state.errorMessage = '';
    },
    REGISTER_FAILURE(state, payload) {
      state.isFetching = false;
      state.errorMessage = payload;
    },
  },
  actions: {
    async registerUser({dispatch}, payload) {
      try {
        dispatch('requestRegister')
        if (payload.email && payload.password) {

          dispatch('receiveRegister')
          router.push('/login')
        } else {
          dispatch('registerError', 'Something was wrong. Try again');
        }
      } catch (e) {
        dispatch('registerError', e.response.data);
      }
    },
    requestRegister({commit}) {
      commit('REGISTER_REQUEST');
    },
    receiveRegister({commit}) {
      commit('REGISTER_SUCCESS');
    },
    registerError({commit}, payload) {
      commit('REGISTER_FAILURE', payload);
    },
    async verifyEmail(payload) {
      try {
        const res = await axios.put("/auth/verify-email", { token: payload })
        if (res) {
          this._vm.$toasted.show('Your email was verified', {
            type : 'success'
          })
          router.push('/login')
        }
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type : 'error'
        })
      } finally {
        router.push('/login')
      }
    },
  },
};

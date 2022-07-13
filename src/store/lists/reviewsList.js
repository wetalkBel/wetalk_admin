
import axios from "axios"

export default {
    namespaced: true,
    state: {
        loading: true,
        rows: {}
    },
    mutations: {
        getData(state, payload) {
            state.rows = []
            state.rows = payload
        },
        showLoader(state) {
            state.loading = true
        },
        hideLoader(state) {
            state.loading = false
        }
    },
    actions: {
        async getData({commit}) {
            try {
                commit('showLoader')
                const response = await axios.get(`/sessions`, {
                    params: {
                        status: ['finished', 'success finished', 'failed']
                    }
                })
                let notEmptyComments = response.data.rows.filter(row => row.comment !== null);
                commit('getData', notEmptyComments)
                commit('hideLoader')
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        }
    },
}


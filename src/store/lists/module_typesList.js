
import axios from "axios"

export default {
    namespaced: true,
    state: {
        loading: true,
        rows: {},
        modalOpen: false,
        deleteId: ''
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
        },
        setDeleteId(state, payload) {
            state.deleteId = payload
        }
    },
    actions: {
        async getData({commit}) {
            try {
                commit('showLoader')
                const response = await axios.get(`/module_types`)
                commit('getData', response.data.rows)
                commit('hideLoader')
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },
        async deleteItem({dispatch, state}) {
            try {
                await axios.delete(`/module_types/${state.deleteId}`)
                this._vm.$toasted.show('Module_types delete', {
                    type : 'success'
                })
                dispatch('getData')
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        }
    },
}


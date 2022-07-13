
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
                const response = await axios.get(`/cities`)
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
                await axios.delete(`/cities/${state.deleteId}`)
                this._vm.$toasted.show('Cities delete', {
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


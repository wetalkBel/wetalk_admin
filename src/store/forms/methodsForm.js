
import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        
    },
    mutations: {
        getData(state, payload) {
            state.data = payload
        },
    
    },
    actions: {
        async newHandler({commit}, payload) {
            try {
                const result = await axios.post('/methods', {data: payload.data})
                this._vm.$toasted.show('Methods created', {
                    type : 'success'
                })
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e, {
                    type : 'error'
                })
            }
        },
        async edit({commit, dispatch}, payload) {
            try {
                const result = await axios.put(`/methods/${payload.id}`, {id: payload.id, data: payload.data})
                
                this._vm.$toasted.show('Methods edit', {
                    type : 'success'
                })
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },
        async getData({commit}, payload) {
            try {
                const result = await axios.get(`/methods/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },
    
    },
}



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
                const result = await axios.post('/pages', {data: payload.data})
                this._vm.$toasted.show('Pages created', {
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
                const result = await axios.put(`/pages/${payload.id}`, {id: payload.id, data: payload.data})
                
                this._vm.$toasted.show('Pages edit', {
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
                const result = await axios.get(`/pages/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },
    
    },
}



import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        
        searchResultTo: [],
        
    },
    mutations: {
        getData(state, payload) {
            state.data = payload
        },
    
        setTo(state, payload) {
            state.searchResultTo = payload.map(item => {
            return {
                value: item.id,
                label: item.label,
                }
            })
        },
        
    },
    actions: {
        async newHandler({commit}, payload) {
            try {
                const result = await axios.post('/notification', {data: payload.data})
                this._vm.$toasted.show('Notification created', {
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
                const result = await axios.put(`/notification/${payload.id}`, {id: payload.id, data: payload.data})
                
                this._vm.$toasted.show('Notification edit', {
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
                const result = await axios.get(`/notification/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },
    
        async searchTo({commit}, val) {
        try {
            if (val) {
                const result = await axios(`/users/autocomplete?query=${val}&limit=100`)
                commit('setTo', result.data)
            } else {
                const result = await axios(`/users/autocomplete?limit=100`)
                commit('setTo', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setTo', [])
            }
        },
    
    },
}


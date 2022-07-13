
import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        
        searchResultChat: [],
        
        searchResultFrom: [],
        
        searchResultTo: [],
        
    },
    mutations: {
        getData(state, payload) {
            state.data = payload
        },
    
        setChat(state, payload) {
            state.searchResultChat = payload.map(item => {
            return {
                value: item.id,
                label: item.label,
                }
            })
        },
        
        setFrom(state, payload) {
            state.searchResultFrom = payload.map(item => {
            return {
                value: item.id,
                label: item.label,
                }
            })
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
                const result = await axios.post('/messages', {data: payload.data})
                this._vm.$toasted.show('Messages created', {
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
                const result = await axios.put(`/messages/${payload.id}`, {id: payload.id, data: payload.data})
                
                this._vm.$toasted.show('Messages edit', {
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
                const result = await axios.get(`/messages/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },
    
        async searchChat({commit}, val) {
        try {
            if (val) {
                const result = await axios(`/chats/autocomplete?query=${val}&limit=100`)
                commit('setChat', result.data)
            } else {
                const result = await axios(`/chats/autocomplete?limit=100`)
                commit('setChat', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setChat', [])
            }
        },
    
        async searchFrom({commit}, val) {
        try {
            if (val) {
                const result = await axios(`/users/autocomplete?query=${val}&limit=100`)
                commit('setFrom', result.data)
            } else {
                const result = await axios(`/users/autocomplete?limit=100`)
                commit('setFrom', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setFrom', [])
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


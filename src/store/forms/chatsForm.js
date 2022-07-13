
import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        
        searchResultUser: [],
        
        searchResultPsychologist: [],
        
    },
    mutations: {
        getData(state, payload) {
            state.data = payload
        },
    
        setUser(state, payload) {
            state.searchResultUser = payload.map(item => {
            return {
                value: item.id,
                label: item.label,
                }
            })
        },
        
        setPsychologist(state, payload) {
            state.searchResultPsychologist = payload.map(item => {
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
                const result = await axios.post('/chats', {data: payload.data})
                this._vm.$toasted.show('Chats created', {
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
                const result = await axios.put(`/chats/${payload.id}`, {id: payload.id, data: payload.data})
                
                this._vm.$toasted.show('Chats edit', {
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
                const result = await axios.get(`/chats/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },
    
        async searchUser({commit}, val) {
        try {
            if (val) {
                const result = await axios(`/users/autocomplete?query=${val}&limit=100`)
                commit('setUser', result.data)
            } else {
                const result = await axios(`/users/autocomplete?limit=100`)
                commit('setUser', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setUser', [])
            }
        },
    
        async searchPsychologist({commit}, val) {
        try {
            if (val) {
                const result = await axios(`/users/autocomplete?query=${val}&limit=100`)
                commit('setPsychologist', result.data)
            } else {
                const result = await axios(`/users/autocomplete?limit=100`)
                commit('setPsychologist', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setPsychologist', [])
            }
        },
    
    },
}


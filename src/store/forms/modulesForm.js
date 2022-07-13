
import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        
        searchResultPage: [],
        
        searchResultModule_type: [],
        
    },
    mutations: {
        getData(state, payload) {
            state.data = payload
        },
    
        setPage(state, payload) {
            state.searchResultPage = payload.map(item => {
            return {
                value: item.id,
                label: item.label,
                }
            })
        },
        
        setModule_type(state, payload) {
            state.searchResultModule_type = payload.map(item => {
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
                const result = await axios.post('/modules', {data: payload.data})
                this._vm.$toasted.show('Modules created', {
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
                const result = await axios.put(`/modules/${payload.id}`, {id: payload.id, data: payload.data})
                
                this._vm.$toasted.show('Modules edit', {
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
                const result = await axios.get(`/modules/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },
    
        async searchPage({commit}, val) {
        try {
            if (val) {
                const result = await axios(`/pages/autocomplete?query=${val}&limit=100`)
                commit('setPage', result.data)
            } else {
                const result = await axios(`/pages/autocomplete?limit=100`)
                commit('setPage', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setPage', [])
            }
        },
    
        async searchModule_type({commit}, val) {
        try {
            if (val) {
                const result = await axios(`/module_types/autocomplete?query=${val}&limit=100`)
                commit('setModule_type', result.data)
            } else {
                const result = await axios(`/module_types/autocomplete?limit=100`)
                commit('setModule_type', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setModule_type', [])
            }
        },
    
    },
}


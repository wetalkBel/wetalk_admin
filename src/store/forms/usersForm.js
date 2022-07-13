
import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        
        searchResultCity: [],
        
        searchResultGender: [],
        
        searchResultMethod: [],
        
        searchResultTargets: [],
        
    },
    mutations: {
        getData(state, payload) {
            state.data = payload
        },
    
        setCity(state, payload) {
            state.searchResultCity = payload.map(item => {
            return {
                value: item.id,
                label: item.label,
                }
            })
        },
        
        setGender(state, payload) {
            state.searchResultGender = payload.map(item => {
            return {
                value: item.id,
                label: item.label,
                }
            })
        },
        
        setMethod(state, payload) {
            state.searchResultMethod = payload
        },
        
        setTargets(state, payload) {
            state.searchResultTargets = payload
        },
        
    },
    actions: {
        async newHandler({commit}, payload) {
            try {
                const result = await axios.post('/users', {data: payload.data})
                this._vm.$toasted.show('Users created', {
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
                const result = await axios.put(`/users/${payload.id}`, {id: payload.id, data: payload.data})
                
                dispatch('auth/findMe', null, {root: true})
                
                this._vm.$toasted.show('Users edit', {
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
                const result = await axios.get(`/users/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },
    
        async searchCity({commit}, val) {
        try {
            if (val) {
                const result = await axios(`/cities/autocomplete?query=${val}&limit=100`)
                commit('setCity', result.data)
            } else {
                const result = await axios(`/cities/autocomplete?limit=100`)
                commit('setCity', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setCity', [])
            }
        },
    
        async searchGender({commit}, val) {
        try {
            if (val) {
                const result = await axios(`/genders/autocomplete?query=${val}&limit=100`)
                commit('setGender', result.data)
            } else {
                const result = await axios(`/genders/autocomplete?limit=100`)
                commit('setGender', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setGender', [])
            }
        },
    
        async searchMethod({commit}, val) {
            try {
                if (val) {
                    const result = await axios(`/methods/autocomplete?query=${val}&limit=100`)
                    commit('setMethod', result.data)
                } else {
                    const result = await axios(`/methods/autocomplete?limit=100`)
                    commit('setMethod', result.data)
                }
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
                commit('setMethod', [])
            }
        },
    
        async searchTargets({commit}, val) {
            try {
                if (val) {
                    const result = await axios(`/targets/autocomplete?query=${val}&limit=100`)
                    commit('setTargets', result.data)
                } else {
                    const result = await axios(`/targets/autocomplete?limit=100`)
                    commit('setTargets', result.data)
                }
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
                commit('setTargets', [])
            }
        },
    
    },
}


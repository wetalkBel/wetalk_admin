
import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        searchResultPsychologist: [],
    },
    mutations: {
        getData(state, payload) {
            state.data = payload
        },

        setPsychologist(state, payload) {
            state.searchResultPsychologist = payload.rows.map(item => {
                return {
                    value: item.id,
                    label: (item.email ? item.email : '') + ' - ' + (item.firstName ? item.firstName : '') + ' ' + (item.lastName ? item.lastName : '') ,
                }
            })
        }
    },
    actions: {
        async edit({commit, dispatch}, payload) {
            try {
                const result = await axios.put(`/calls/${payload.id}`, {id: payload.id, data: payload.data})
                
                dispatch('auth/findMe', null, {root: true})
                
                this._vm.$toasted.show('Calls edit', {
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
                const result = await axios.get(`/calls/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },

        async searchPsychologist({commit}, val) {
            try {
                const result = await axios.get(`/users`,{
                    params: {
                        role: ['psychologist'] || ['coordinator'],
                        disabled: false,
                        limit: 100
                    }
                })
                commit('setPsychologist', result.data)
                // if (val) {
                //
                // } else {
                //     const result = await axios(`/users/autocomplete?limit=100`)
                //     console.log(result.data);
                //     commit('setPsychologist', result.data)
                // }
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
                commit('setPsychologist', [])
            }
        },
    },
}


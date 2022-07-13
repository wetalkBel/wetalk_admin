
import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        
        searchResultAuthor: [],
        
        searchResultTags: [],
        
    },
    mutations: {
        getData(state, payload) {
            state.data = payload
        },
    
        setAuthor(state, payload) {
            state.searchResultAuthor = payload.rows.map(item => {
            return {
                value: item.id,
                label: (item.email ? item.email : '') + ' - ' + (item.firstName ? item.firstName : '') + ' ' + (item.lastName ? item.lastName : ''),
                }
            })
        },
        
        setTags(state, payload) {
            state.searchResultTags = payload
        },
        
    },
    actions: {
        async newHandler({commit}, payload) {
            try {
                const result = await axios.post('/posts', {data: payload.data})
                this._vm.$toasted.show('Posts created', {
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
                const result = await axios.put(`/posts/${payload.id}`, {id: payload.id, data: payload.data})
                
                this._vm.$toasted.show('Posts edit', {
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
                const result = await axios.get(`/posts/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
            }
        },
    
        async searchAuthor({commit}, val) {
        try {
            if (val) {
                const result = await axios.get(`/users`, {
                    params: {
                        role: ['psychologist'],
                        disabled: false,
                        limit: 100
                    }
                })
                commit('setAuthor', result.data)
            } else {

                // let params = {
                //     disabled: false,
                //     limit: 100
                // }
                // let params = new URLSearchParams()
                // params.append("role",'coordinator');
                // //params.append("role",'admin');
                // params.append("disabled", 'false');
                // params.append("limit", '100');
                //
                // console.log(params);

                //let request = { params: params}

                // const params = new URLSearchParams([['role', 'admin'], ['role', 'coordinator']]);
                // params.append('disabled', false);
                // params.append('limit', 100);

                //const result = await axios.get(`/users/roles`)

                // console.log(resultCoordinator);
                //
                const result = await axios.get(`/users`, {
                    params: {
                        role: ['psychologist'],
                        disabled: false,
                        limit: 100
                    }
                })

                // const resultCoordinator = await axios.get(`/users`, {
                //     params: {
                //         role: ['coordinator'],
                //         disabled: false,
                //         limit: 100
                //     }
                // })
                //
                // const resultCoordinator = await axios.get(`/users`, {
                //     params: {
                //         role: ['coordinator', 'psychologist'],
                //         disabled: false,
                //         limit: 100
                //     }
                // })

                // console.log(resultAdmin);
                //
                // let result = Object.assign(resultCoordinator, resultAdmin);
                //
                // console.log(result.data)

                commit('setAuthor', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setAuthor', [])
            }
        },
    
        async searchTags({commit}, val) {
            try {
                if (val) {
                    const result = await axios(`/tags/autocomplete?query=${val}&limit=100`)
                    commit('setTags', result.data)
                } else {
                    const result = await axios(`/tags/autocomplete?limit=100`)
                    commit('setTags', result.data)
                }
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
                commit('setTags', [])
            }
        },
    
    },
}


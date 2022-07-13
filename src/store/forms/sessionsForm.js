
import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        
        searchResultUser: [],
        
        searchResultPsychologist: [],
        
        searchResultReportGender: [],
        
        searchResultReportProblemCode: [],
        
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
        
        setReportGender(state, payload) {
            state.searchResultReportGender = payload.map(item => {
            return {
                value: item.id,
                label: item.label,
                }
            })
        },
        
        setReportProblemCode(state, payload) {
            state.searchResultReportProblemCode = payload
        },
        
    },
    actions: {
        async newHandler({commit}, payload) {
            try {
                const result = await axios.post('/sessions', {data: payload.data})
                this._vm.$toasted.show('Sessions created', {
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
                const result = await axios.put(`/sessions/${payload.id}`, {id: payload.id, data: payload.data})
                
                this._vm.$toasted.show('Sessions edit', {
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
                const result = await axios.get(`/sessions/${payload}`)
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
    
        async searchReportGender({commit}, val) {
        try {
            if (val) {
                const result = await axios(`/genders/autocomplete?query=${val}&limit=100`)
                commit('setReportGender', result.data)
            } else {
                const result = await axios(`/genders/autocomplete?limit=100`)
                commit('setReportGender', result.data)
            }
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e , {
                type : 'error'
            })
            commit('setReportGender', [])
            }
        },
    
        async searchReportProblemCode({commit}, val) {
            try {
                if (val) {
                    const result = await axios(`/problemCodes/autocomplete?query=${val}&limit=100`)
                    commit('setReportProblemCode', result.data)
                } else {
                    const result = await axios(`/problemCodes/autocomplete?limit=100`)

                    result.data.forEach(item => {
                        let i;

                        if(item.label.includes('Address')) {
                            i = item.label.replace('Address', 'Адрес').split('::').join('/')
                        }

                        if(item.label.includes('Appeal')) {
                            i = item.label.replace('Appeal', 'Тип обращения').split('::').join('/')
                        }

                        if(item.label.includes('ProblemCodes')) {
                            i = item.label.replace('ProblemCodes', 'Код проблемы').split('::').join('/')
                        }

                        if(item.label.includes('Methods')) {
                            i = item.label.replace('Methods', 'Метод').split('::').join('/')
                        }

                        if(item.label.includes('HelpTypes')) {
                            i = item.label.replace('HelpTypes', 'Тип помощи').split('::').join('/')
                        }

                        if(item.label.includes('CommunicationTypes')) {
                            i = item.label.replace('CommunicationTypes', 'Вид связи').split('::').join('/')
                        }

                        item.label = i;
                    });

                    commit('setReportProblemCode', result.data)
                }
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e , {
                    type : 'error'
                })
                commit('setReportProblemCode', [])
            }
        },
    
    },
}


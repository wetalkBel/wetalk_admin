export default {
  namespaced: true,
  state: {
    visits: {},
    performance: {sdk: {}, integration: {}},
    server: {1: {}, 2: {}},
    revenue: [],
    mainChart: [],
    isReceiving: false
  },
  mutations: {
    RECEIVED_DATA_SUCCESS(state, payload) {
      const {visits, performance, server, revenue, mainChart} = payload;
      state = Object.assign(state, {
        visits,
        performance,
        server,
        revenue,
        mainChart,
        isReceiving: false
      })
    },
    RECEIVING_DATA(state) {
      state.isReceiving = true;
    },
  },
  actions: {
    receiveDataSuccess({commit}, payload) {
      commit('RECEIVED_DATA_SUCCESS', payload);
    },
    receivingData({commit}) {
      commit('RECEIVING_DATA');
    },
  },
};

export const actions = {
  setUser ({ commit, state }, username) {
    commit('SET_USER', { username: username })
  },
  setAdmin ({ commit, state }, num) {
    commit('SET_ADMIN', { rank: num })
  },
  setSellDetail ({ commit, state }, obj) {
    commit('SET_SELLDETAIL', { selldetail: obj })
  },
  setToUser ({ commit, state }, toUser) {
    commit('SET_TOUSER', { toUser: toUser })
  }
}

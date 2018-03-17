export const actions = {
  setUser ({ commit, state }, username) {
    commit('SET_USER', { username: username })
  },
  setAdmin ({ commit, state }, num) {
    commit('SET_ADMIN', { rank: num })
  }
}

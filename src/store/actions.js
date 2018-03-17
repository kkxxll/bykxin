export const actions = {
  setUser ({ commit, state }, username) {
    commit('SET_USER', { username: username })
  }
}

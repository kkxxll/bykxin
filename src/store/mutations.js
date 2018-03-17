import * as types from './types'
export const mutations = {
  [types.SET_USER] (state, { username }) {
    state.user = username
  },
  [types.SET_ADMIN] (state, { rank }) {
    state.admin = rank
  }
}

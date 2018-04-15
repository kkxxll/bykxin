import * as types from './types'
export const mutations = {
  [types.SET_USER] (state, { username }) {
    state.user = username
  },
  [types.SET_ADMIN] (state, { rank }) {
    state.admin = rank
  },
  [types.SET_SELLDETAIL] (state, { selldetail }) {
    state.sellDetail = selldetail
  },
  [types.SET_TOUSER] (state, { toUser }) {
    state.toUser = toUser
  }
}

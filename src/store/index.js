import Vue from 'vue'
import vuex from 'vuex'

import { state } from './states'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

import createLogger from 'vuex/dist/logger'

Vue.use(vuex)

export default new vuex.Store({
  actions,
  getters,
  state,
  mutations,
  plugins: [createLogger()]
})

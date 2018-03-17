// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import axios from 'axios'

import ElementUI from 'element-ui'

Vue.use(ElementUI)

Vue.config.productionTip = false

// Vue.prototype.TIMER = 'dsfsdf'

router.beforeEach((to, from, next) => {
  axios
    .get('/api/users/showSignin')
    .then(response => {
      let res = response.data.msg
      // session还没过期，防止页面刷新时vuex失效
      store.dispatch('setUser', res.user)
      store.dispatch('setAdmin', res.role)
    }).then(function () {
      if (to.meta.signinRequired) {
        console.log('?????')
        if (store.state.user) {
          next()
        } else {
          next({ name: 'Index' })
        }
      } else {
        next()
      }

      if (to.meta.adminRequired) {
        if ((store.state.admin > 90) && store.state.user) {
          next()
        } else {
          next({ name: 'Index' })
        }
      } else {
        next()
      }
    })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

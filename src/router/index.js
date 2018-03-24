import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/container/Index'
import Signin from '@/container/Signin'
import Signup from '@/container/Signup'
import UserCenter from '@/container/UserCenter'
import Buyer from '@/container/Buyer'
import Seller from '@/container/Seller'

import SellNew from '@/container/SellNew'
import BuyNew from '@/container/BuyNew'

import Admin from '@/container/Admin/Index'
import AdminUser from '@/container/Admin/UserList'
import AdminGoods from '@/container/Admin/GoodsList'
import AdminCategory from '@/container/Admin/CategoryList'
import NotFound from '@/container/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'usercenter',
          name: 'UserCenter',
          meta: {
            signinRequired: true
          },
          component: UserCenter
        },
        {
          path: 'buyer',
          name: 'Buyer',
          component: Buyer
        },
        {
          path: 'seller',
          name: 'Seller',
          component: Seller
        }
      ]
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/sellnew',
      name: 'SellNew',
      meta: {
        signinRequired: true
      },
      component: SellNew
    },
    {
      path: '/buynew',
      name: 'BuyNew',
      meta: {
        signinRequired: true
      },
      component: BuyNew
    },
    {
      path: '/admin',
      name: 'Admin',
      meta: {
        adminRequired: true
      },
      component: Admin,
      children: [
        {
          path: 'user',
          name: 'AdminUser',
          meta: {
            adminRequired: true
          },
          component: AdminUser
        },
        {
          path: 'goods',
          name: 'AdminGoods',
          meta: {
            adminRequired: true
          },
          component: AdminGoods
        },
        {
          path: 'category',
          name: 'AdminCategory',
          meta: {
            adminRequired: true
          },
          component: AdminCategory
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  mode: 'history'
})

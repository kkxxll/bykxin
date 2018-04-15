<template>
  <div class="hello">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buyer' }">我是卖家</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/seller' }">我是买家</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/usercenter' }" v-show="user">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/signin' }" v-show="!user">登录</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/signup' }" v-show="!user">注册</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/user' }" v-show="admin > 90">系统后台</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-tag v-show="user">欢迎您，{{user}}</el-tag>
    <el-button type="danger" @click="logout" plain v-show="user">退出</el-button>
    <router-view/>
    <!-- <chat></chat> -->
  </div>
</template>

<script>
// import Chat from './Chat'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    admin () {
      return this.$store.getters.admin
    }
  },
  methods: {
    logout () {
      axios.get('/api/users/logout').then((response) => {
        let res = response.data.msg
        this.$message({
          showClose: true,
          message: res,
          type: 'success',
          center: true
        })
        this.$store.dispatch('setUser', '')
        this.$store.dispatch('setAdmin', 0)
        this.$router.push({ name: 'Index' })
      })
    }
  }
}
</script>

<style scoped>

</style>

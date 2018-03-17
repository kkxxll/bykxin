<template>
  <div class="hello">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我是卖家</el-breadcrumb-item>
      <el-breadcrumb-item>我是买家</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/usercenter' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/signin' }">登录</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/signup' }">注册</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/user' }">系统后台</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" @click="logout">退出</el-button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    logout () {

    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="hello">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我是卖家</el-breadcrumb-item>
      <el-breadcrumb-item>我是买家</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/signin' }">登录</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/signup' }">注册</el-breadcrumb-item>
      <el-breadcrumb-item>退出</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin' }">系统后台</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success">成功按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

</style>

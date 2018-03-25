<template>
  <div class="admin">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="AdminUser">用户管理</el-menu-item>
      <el-submenu index="2">
        <template slot="title">商品管理</template>
        <el-menu-item index="AdminSellList">出售的商品</el-menu-item>
        <el-menu-item index="2-2">求购的商品</el-menu-item>
        <!-- <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-menu-item index="AdminCategory">分类管理</el-menu-item>
      <el-menu-item index="4" disabled>消息中心</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push({name: key})
    }
  }
}
</script>

<style scoped>

</style>

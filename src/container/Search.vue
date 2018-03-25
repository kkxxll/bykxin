<template>
  <div class="search">
    <el-form :inline="true" :model="formdata" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="formdata.title" placeholder="搜索你想要的商品"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(formdata.title)">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  props: ['name'],
  data () {
    return {
      formdata: {
        title: ''
      }
    }
  },
  methods: {
    onSubmit (val) {
      if (!val) {
        return
      }
      let q = val
      let name = this.name
      this.$router.push({name: 'Result', params: { q, name }})
    }
  }
}
</script>
<style lang="less">
.search {
  text-align: right;
}
</style>

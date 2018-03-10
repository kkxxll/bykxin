<template>
  <div class="signup">
    <h3>注册页</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd1"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.pwd2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <router-link :to="{ name: 'Index'}"><el-button>返回首页</el-button></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      form: {
        name: '',
        pwd1: '',
        pwd2: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>

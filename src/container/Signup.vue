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
import axios from 'axios'
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
      let params = {
        userName: this.form.name,
        userPass: this.form.pwd1
      }
      axios.post('/api/users/signup', params).then((response) => {
        console.log(response)
        // let res = response.data
        // if (res.status === '0') {
        //   // this.$router.push({name: 'signin'})
        //   console.log('signup success')
        // } else {
        //   console.log('signup error')
        // }
      })
    }
  }
}
</script>

<style scoped>

</style>

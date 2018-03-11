<template>
  <div class="signin">
    <h3>登录页</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="记住密码" name="type"></el-checkbox>
          <el-checkbox label="不记住密码" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <router-link :to="{ name: 'Index'}">
          <el-button>返回首页</el-button>
        </router-link>
        <router-link :to="{ name: 'Signup'}">
          <el-button>返回登录页</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Signin',
  data () {
    return {
      form: {
        name: '',
        pwd: '',
        type: []
      }
    }
  },
  methods: {
    onSubmit () {
      let params = {
        userName: this.form.name,
        userPass: this.form.pwd
      }
      axios.post('/api/users/signin', params).then((response) => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style scoped>

</style>

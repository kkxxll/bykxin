<template>
  <div class="signup">
    <h3>注册页</h3>
    <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm1.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm1.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm1.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm1')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm1')">重置</el-button>
        <router-link :to="{ name: 'Index'}">
          <el-button>返回首页</el-button>
        </router-link>
        <router-link :to="{ name: 'Signin'}">
          <el-button>返回登录页</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <el-button :plain="true" @click="openWarm" v-show="isNotShow">警告</el-button>
    <el-button :plain="true" @click="openSuc" v-show="isNotShow">成功</el-button>
    <el-button :plain="true" @click="openErr" v-show="isNotShow">失败</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Signup',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm1.checkPass !== '') {
          this.$refs.ruleForm1.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm1.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isNotShow: false,
      ruleForm1: {
        name: '',
        pass: '',
        checkPass: ''
      },
      rules1: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    openErr () {
      this.$message({
        showClose: true,
        message: '抱歉，该用户名已存在',
        type: 'error',
        center: true
      })
    },
    openSuc () {
      this.$message({
        showClose: true,
        message: '创建账号成功，3s后跳转到登录页',
        type: 'success',
        center: true
      })
    },
    openWarm () {
      this.$message({
        showClose: true,
        message: '请正确填写表单内容哦',
        type: 'warning',
        center: true
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit()
        } else {
          this.openWarm()
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit () {
      let params = {
        userName: this.ruleForm1.name,
        userPass: this.ruleForm1.pass
      }
      axios.post('/api/users/signup', params).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.openSuc()
          setTimeout(() => {
            this.$router.push({name: 'Signin'})
          }, 3000)
        } else if (res.status === '2') {
          this.openErr()
        } else {
          console.log('服务器错误')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

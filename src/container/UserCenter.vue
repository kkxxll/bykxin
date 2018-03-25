<template>
  <div class="usercenter">
    <h3>用户中心页</h3>
    <el-form :label-position="labelPosition" label-width="150px" :model="formdata">
      <el-form-item label="用户名">
        <el-input v-model="formdata.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建日期">
        <el-input v-model="formdata.createAt" disabled></el-input>
      </el-form-item>
      <el-form-item label="上一次修改日期">
        <el-input v-model="formdata.updateAt" disabled></el-input>
      </el-form-item>
      <el-form-item label="出售的宝贝" class="usercenter-par">
        <el-input v-model="formdata.sell" disabled></el-input>
        <el-button type="primary" class="usercenter-child" @click="userSell">查看</el-button>
      </el-form-item>
      <el-form-item label="求购的宝贝" class="usercenter-par">
        <el-input v-model="formdata.buy" disabled></el-input>
        <el-button type="primary" class="usercenter-child">查看</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'UserCenter',
  data () {
    return {
      labelPosition: 'right',
      formdata: {
        name: '',
        createAt: '',
        updateAt: '',
        buy: 0,
        sell: 0
      }
    }
  },
  mounted () {
    axios.get('/api/users/userinfo').then((response) => {
      let res = response.data
      if (res.status === '0') {
        this.formdata.name = res.msg.name
        this.formdata.createAt = moment(res.msg.meta.createAt).format('YYYY/MM/DD h:mm:ss')
        this.formdata.updateAt = moment(res.msg.meta.updateAt).format('YYYY/MM/DD h:mm:ss')
        this.buy = res.msg.buy.length
        this.sell = res.msg.sell.length
      }
    })
  },
  methods: {
    userSell () {
      let author = this.$store.state.user
      this.$router.push({name: 'UserSell', params: { author }})
    }
  }
}
</script>
<style lang="less" scoped>
.usercenter {
  width: 60%;
}
.usercenter-par {
  position: relative;
}
.usercenter-child {
  position: absolute;
  right: -80px;
  top: 0;
}
</style>

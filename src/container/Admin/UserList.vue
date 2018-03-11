<template>
  <div class="user-list">
    <el-table :data="tableData" border>
      <el-table-column header-align="center" prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column header-align="center" prop="createAt" label="创建日期" width="150">
      </el-table-column>
      <el-table-column header-align="center" prop="updataAt" label="更新日期" width="150">
      </el-table-column>
      <el-table-column header-align="center" prop="role" label="角色" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.role === 0 ? 'primary' : 'success'" close-transition>{{scope.row.role === 0 ? '普通用户' : '管理员'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="buy" label="已卖出的宝贝" width="150">
      </el-table-column>
      <el-table-column header-align="center" prop="sell" label="已买到的宝贝" width="150">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'AdminUser',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    moment().format()
    axios.get('/api/users/list').then((response) => {
      let res = response.data
      if (res.status === '0') {
        let arr = []
        let obj = {}
        res.users.forEach(element => {
          obj = {
            name: element.name,
            createAt: moment(element.meta.createAt).format('YYYY/MM/DD'),
            updataAt: moment(element.meta.updateAt).format('YYYY/MM/DD'),
            role: element.role,
            buy: element.buy.length,
            sell: element.sell.length
          }
          arr.push(obj)
        })
        this.tableData = arr
      } else {
        console.log('服务器错误')
      }
    })
  },
  methods: {
    handleClick (index, row) {
      this.delUser(index, row.name)
    },
    delUser (index, name) {
      console.log(index)
      this.$confirm('确定要删除:' + name + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        axios({
          method: 'delete',
          url: '/api/users/del',
          data: {
            'name': name
          }
        }).then(function (response) {
          console.log('删除成功')
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-list {
  & .el-table th {
    text-align: center
  }
  & .el-table {
    max-width: 980px
  }
}
</style>

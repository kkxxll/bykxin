<template>
  <div class="admin-category">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="新增分类">
        <el-input v-model="formInline.name" placeholder="分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="250" header-align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类名" width="180" header-align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <el-tag type="success">{{ scope.row.name }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">查看所有商品</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'CategoryAdmin',
  data () {
    return {
      formInline: {
        name: ''
      },
      tableData: []
    }
  },
  mounted () {
    this.updateList()
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
    },
    updateList () {
      axios.get('/api/category/list').then((response) => {
        let res = response.data
        let arr = []
        let obj = {}
        res.categories.forEach(item => {
          obj = {
            name: item.name,
            date: moment(item.meta.createAt).format('YYYY/MM/DD')
          }
          arr.push(obj)
        })
        this.tableData = arr
      })
    },
    onSubmit () {
      if (!this.formInline.name) {
        this.$message({
          showClose: true,
          message: '分类名不能为空',
          type: 'warning',
          center: true
        })
      } else {
        let params = {
          category: this.formInline.name
        }
        axios.post('/api/category/new', params).then((response) => {
          let res = response.data
          switch (res.status) {
            case '0':
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'success',
                center: true
              })
              this.updateList()
              break
            case '2':
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'warning',
                center: true
              })
              break
            default:
              this.$message({
                showClose: true,
                message: '服务器错误',
                type: 'error',
                center: true
              })
              break
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.admin-category {
  margin-top: 30px;

  & .el-form {
    text-align: left;
  }
  & .el-table {
    padding-top: 20px;
  }
}
</style>

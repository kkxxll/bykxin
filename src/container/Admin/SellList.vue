<template>
  <div class="admin-sell">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="130" header-align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ (scope.row.meta.createAt) | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180" header-align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="180" header-align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="180" header-align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="180" header-align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问量" width="80" header-align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.pv }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'AdminSellList',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  filters: {
    formatTime: function (value) {
      return moment(value).format('YYYY/MM/DD')
    }
  },
  mounted () {
    axios.get('/api/sell/list').then((response) => {
      let res = response.data
      this.tableData = res.sells
    })
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>

</style>

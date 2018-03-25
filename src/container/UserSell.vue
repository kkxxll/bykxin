<template>
  <div class="selllist">
    <div class="selllist-tit">
      <el-tag>您出售的商品</el-tag>
    </div>
    <div class="selllist-con">
      <el-row>
        <el-col :span="5" v-for="(sell, idx) in sellList" :key="idx" :offset="idx % 4 > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="sell.photo[0]" class="image">
            <div style="padding: 14px;">
              <span>{{sell.title}}</span>
              <span class="selllist-price">￥{{sell.price}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ sell.meta.createAt|formatTime }}</time>
                <el-button type="text" class="button" @click="openDetail(sell._id, sell.category)">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="selllist-page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :total="total"
        :page-size="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  data () {
    return {
      allList: [],
      currentPage: 1,
      sellList: [],
      category: '',
      total: 8,
      count: 8
    }
  },
  filters: {
    formatTime: function (value) {
      if (value) {
        return moment(value).format('YYYY/MM/DD')
      }
    }
  },
  mounted () {
    // this.category = this.$route.params.name
    const name = this.$route.params.author
    axios.get('/api/sell/listsell/' + name).then((response) => {
      let res = response.data
      this.allList = res.sells
      this.total = this.allList.length
      this.sellList = this.allList.slice((this.currentPage - 1) * this.count, this.currentPage * this.count)
    })
  },
  methods: {
    openDetail (id, name) {
      this.$router.push({name: 'SellDetail', params: { id, name }})
    },
    handleCurrentChange (val) {
      this.sellList = this.allList.slice((val - 1) * this.count, val * this.count)
    }
  }
}
</script>
<style lang="less">
.el-col {
  margin-bottom: 10px;
}
.selllist-tit {
  margin: 10px 0;
}
.selllist-page {
  margin: 10px 0;
}
</style>

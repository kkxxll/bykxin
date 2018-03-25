<template>
  <div class="result">
    <h3>搜索结果页:<el-tag class="result-tag">{{category}}</el-tag></h3>
    <div class="result-list">
      <el-row>
        <el-col :span="5" v-for="(sell, idx) in sellList" :key="idx" :offset="idx % 4 > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="sell.photo[0]" class="image">
            <div style="padding: 14px;">
              <span>{{sell.title}}</span>
              <span class="selllist-price">￥{{sell.price}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ sell.meta.createAt|formatTime }}</time>
                <el-button type="text" class="button" @click="openDetail(sell._id, category)">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  data () {
    return {
      category: '',
      sellList: []
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
    const q = this.$route.params.q
    this.category = this.$route.params.name
    axios.get('/api/sell/search/' + q).then((response) => {
      let res = response.data
      this.sellList = res.result
    })
  },
  methods: {
    openDetail (id, name) {
      this.$router.push({name: 'SellDetail', params: { id, name }})
    }
  }
}
</script>
<style lang="less">
.result-tag {
  margin-left: 15px;
}
</style>

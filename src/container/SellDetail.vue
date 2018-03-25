<template>
  <div class="selldetail">
    <div class="selldetail-backbtn">
      <el-button type="primary" @click="backSeller">返回</el-button>
    </div>
    <div>{{sellDetail.author}}</div>
    <div>{{sellDetail.title}}</div>
    <div>{{sellDetail.desc}}</div>
    <div>{{this.$route.params.name}}</div>
    <div>{{ (sellDetail.meta ? sellDetail.meta.createAt : '')  | formatTime }}</div>
    <div>{{sellDetail.pv}}</div>
    <div v-for="(item, idx) in sellDetail.photo" :key="idx" class="selldetail-img">
      <img :src="item" alt="">
    </div>
    <div>
      留言板
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data () {
    return {
      sellDetail: ''
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
    const id = this.$route.params.id
    axios.get('/api/sell/detail/' + id).then((response) => {
      let res = response.data
      this.sellDetail = res.sell
    })
  },
  methods: {
    backSeller () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
.selldetail-backbtn {
  text-align: right;
}
.selldetail-img > img {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>

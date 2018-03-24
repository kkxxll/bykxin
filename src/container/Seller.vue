<template>
  <div class="seller">
    <div class="seller-newbtn">
      <el-button type="primary" @click="openBuyNew" v-if="user">求购其他商品</el-button>
      <el-button type="primary" v-else disabled>求购其他商品(请先登录)</el-button>
    </div>
    <div class="seller-list">
      <el-collapse v-model="activecategory" @change="handleChange">
        <el-collapse-item v-for="(item, index) in category" :key="index" :name="index">
          <template slot="title">
            {{item}}
            <i class="el-icon-loading"></i>
          </template>
          <div class="seller-con">
            <el-row>
              <el-col :span="5" v-for="(sell, index) in sells[index]" :key="index" :offset="index > 0 ? 1 : 0">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="sell.photo[0]" class="image">
                  <div style="padding: 14px;">
                    <span>{{sell.title}}</span>
                    <span class="seller-price">￥{{sell.price}}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{ sell.meta.createAt|formatTime }}</time>
                      <el-button type="text" class="button" @click="openDetail(sell)">查看详情</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>

      </el-collapse>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'Buyer',
  data () {
    return {
      currentDate: new Date(),
      activecategory: [],
      category: [],
      sells: []
    }
  },
  filters: {
    formatTime: function (value) {
      return moment(value).format('YYYY/MM/DD')
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    axios.get('/api/category/list').then((response) => {
      let res = response.data
      let arr = []
      res.categories.forEach((item, index) => {
        arr.push(item.name)
        this.activecategory.push(index)
        this.getByCategory(item._id)
      })
      this.category = arr
    })
  },
  methods: {
    openBuyNew () {
      this.$router.push({ name: 'BuyNew' })
    },
    handleChange (val) {
      console.log(val)
    },
    getByCategory (id) {
      axios.get('/api/sell/list/' + id).then((response) => {
        let res = response.data
        this.sells.push(res.sells)
        console.log(res.sells)
      })
    },
    openDetail (itme) {
      console.log(itme)
    }
  }
}
</script>

<style lang="less" scoped>
.seller {
  margin-top: 30px;
}
.seller-newbtn {
  text-align: right;
}
.seller-list {
  margin-top: 30px;
  user-select:none;

  & .el-collapse-item {
    text-align: left;
  }
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.seller-price {
  float: right;
}
</style>

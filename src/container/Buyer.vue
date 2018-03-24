<template>
  <div class="buyer">
    <div class="buyer-newbtn">
      <el-button type="primary" @click="openSellNew" v-if="user">出售新的商品</el-button>
      <el-button type="primary" v-else disabled>出售新的商品(请先登录)</el-button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Buyer',
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    openSellNew () {
      this.$router.push({name: 'SellNew'})
    }
  }
}
</script>

<style lang="less" scoped>
.buyer {
  margin-top: 30px;
}
.buyer-newbtn {
  text-align: right;
}
</style>

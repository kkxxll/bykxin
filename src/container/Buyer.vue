<template>
  <div class="buyer">
    <div class="buyer-newbtn">
      <el-button type="primary" @click="openSellNew">出售新的商品</el-button>
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

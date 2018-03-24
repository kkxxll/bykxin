<template>
  <div class="seller">
    <div class="seller-newbtn">
      <el-button type="primary" @click="openBuyNew">求购其他商品</el-button>
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
    openBuyNew () {
      this.$router.push({name: 'BuyNew'})
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
</style>

<template>
  <div class="sellnew">
    <h4 class="sellnew-tit">出售商品</h4>
    <div class="sellnew-form">
      <el-form ref="form" :model="form" label-width="80px"
        method="post"
        enctype="multipart/form-data"
        action="/api/sell/new"
        target="hide_iframe">
        <input type="text" :value="this.$store.state.user" name="author" v-show="false">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" name="title"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" class="sellnew-category">
          <el-radio-group v-model="form.curcategory">
            <el-radio v-for="item in form.category" name="category" :label="item" :key="item"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="价格￥">
          <el-input v-model="form.price" placeholder="0.00" name="price"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" class="sellnew-desc">
          <el-input type="textarea" name="desc" v-model="form.desc" placeholder="描述一下商品的细节"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" class="sellnew-imgs">
          <div class="sellnew-imgs__new">
              <input type="file" name="photo" multiple="multiple">
          </div>
        </el-form-item>
        <input type="submit" @click="submitSell">
      </el-form>
    </div>
    <iframe name="hide_iframe" v-show="false"></iframe>
  </div>
</template>

<script>
// import store from '../store/'
import axios from 'axios'
export default {
  name: 'SellNew',
  data () {
    return {
      mainimg: 2,
      form: {
        name: '',
        curcategory: '',
        desc: '',
        price: '',
        category: []
      }
    }
  },
  mounted () {
    axios.get('/api/category/list').then((response) => {
      let res = response.data
      let arr = []
      res.categories.forEach(item => {
        arr.push(item.name)
      })
      this.form.category = arr
    })
  },
  methods: {
    submitSell () {
      console.log(111)
    }
  }
}
</script>
<style lang="less">
.sellnew-form {
  width: 70%;
  margin: 0 auto;
}
.sellnew-category {
  text-align: left;
}
.el-textarea__inner {
  height: 120px;
}
.sellnew-imgs {
  text-align: left;
  position: relative;
}
.sellnew-imgs img {
  vertical-align: bottom;
  max-width: 140px;
  max-height: 140px;
}
.sellnew-imgs ul {
  padding-left: 0;
  margin: 0;
  padding-right: 100px;
}
.sellnew-imgs li {
  display: inline-block;
  list-style: none;
  margin-right: 3px;
  position: relative;
  cursor: pointer;
  padding: 0;
}
.sellnew-imgs li:hover .sellnew-imgs__fixed {
  display: block;
}
.sellnew-imgs__fixed {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  display: none;
  background: rgba(0, 0, 0, .3);
  text-align: center;
}
.sellnew-imgs__main,
.sellnew-imgs__del {
  height: 50%;
  width: 100%;
}
.sellnew-imgs__del {
  border-top: 1px #333 solid;
  margin-top: -1px;
}
.sellnew-imgs__main:hover,
.sellnew-imgs__del:hover {
  color: #fff;
  background: rgba(0, 0, 0, 0.6)
}
.sellnew-imgs__cur {
  position: absolute;
  top:5px;
  left: 5px;
  font-size: 20px;
}
.sellnew-imgs__new {
  float: right;
  position: absolute;
  right: 0;
  top: 10px;
}
.sellnew-btn {
  margin: 15px 0;
}

</style>

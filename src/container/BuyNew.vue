<template>
  <div class="buynew">
    <h4 class="buynew-tit">求购商品</h4>
    <div class="buynew-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" class="buynew-category">
          <el-radio-group v-model="form.curcategory">
            <el-radio v-for="item in form.category" :label="item" :key="item"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品描述" class="buynew-desc">
          <el-input type="textarea" v-model="form.desc" placeholder="描述一下商品的细节"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" class="buynew-imgs">
          <ul>
            <li v-for="(item, index) in form.photos" :key="index">
              <img :src="item" alt="">
              <div class="buynew-imgs__fixed">
                <div class="buynew-imgs__main" @click="setMainImg(index)">设为主图</div>
                <div class="buynew-imgs__del" @click="delImg(index)">删除</div>
              </div>
              <i class="el-icon-success buynew-imgs__cur" v-show="index === mainimg"></i>
            </li>
          </ul>
          <div class="buynew-imgs__new">
            <el-button type="info">上传照片</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="buynew-btn">
      <el-button type="warning" @click="createBuy">发布</el-button>
    </div>
  </div>
</template>

<script>
import store from '../store/'
import axios from 'axios'
export default {
  name: 'BuyNew',
  data () {
    return {
      mainimg: 2,
      form: {
        name: '',
        delivery: false,
        curcategory: '',
        desc: '',
        category: [
        ],
        photos: [
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3556326025,2943004307&fm=27&gp=0.jpg',
          'http://pic1.sc.chinaz.com/Files/pic/pic9/201803/zzpic10964_s.jpg',
          'http://img.ivsky.com/img/tupian/co/201712/14/xicanpan-004.jpg',
          'http://img.ivsky.com/img/tupian/t/201712/14/jiaoche-002.jpg',
          'http://img.ivsky.com/img/tupian/t/201712/14/jiaoche-005.jpg'
        ]
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
    setMainImg (idx) {
      this.mainimg = idx
    },
    delImg (idx) {
      if (this.mainimg === idx) {
        this.$message({
          message: '不能删除主图哦',
          type: 'warning'
        })
      } else if (idx < this.mainimg) {
        this.form.photos.splice(idx, 1)
        this.mainimg = this.mainimg - 1
      } else {
        this.form.photos.splice(idx, 1)
      }
    },
    showMessage (str) {
      this.$message({
        showClose: true,
        message: str,
        type: 'error',
        center: true
      })
    },
    verifyForm () {
      if (!store.state.user) {
        this.showMessage('您的信息已过期，请重新登录')
        return false
      } else if (!this.form.name) {
        this.showMessage('请输入商品名称')
        return false
      } else if (!this.form.curcategory) {
        this.showMessage('请选择商品分类')
        return false
      } else if (!this.form.desc) {
        this.showMessage('请输入商品描述')
        return false
      } else {
        return true
      }
    },
    createBuy () {
      let verifyForm = this.verifyForm()
      if (!verifyForm) {
        return
      }
      let params = {
        author: store.state.user,
        title: this.form.name,
        desc: this.form.desc,
        photo: this.form.photos,
        category: this.form.curcategory
      }

      axios.post('/api/buy/new', params).then((response) => {
        let res = response.data
        console.log(res.msg)
        switch (res.status) {
          case '0':
            this.$message({
              showClose: true,
              message: res.msg,
              type: res.msg,
              center: true
            })
            this.$router.push({name: 'Seller'})
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
</script>
<style lang="less">
.buynew-form {
  width: 70%;
  margin: 0 auto;
}
.buynew-category {
  text-align: left;
}
.el-textarea__inner {
  height: 120px;
}
.buynew-imgs {
  text-align: left;
  position: relative;
}
.buynew-imgs img {
  vertical-align: bottom;
  max-width: 140px;
  max-height: 140px;
}
.buynew-imgs ul {
  padding-left: 0;
  margin: 0;
  padding-right: 100px;
}
.buynew-imgs li {
  display: inline-block;
  list-style: none;
  margin-right: 3px;
  position: relative;
  cursor: pointer;
  padding: 0;
}
.buynew-imgs li:hover .buynew-imgs__fixed {
  display: block;
}
.buynew-imgs__fixed {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  display: none;
  background: rgba(0, 0, 0, .3);
  text-align: center;
}
.buynew-imgs__main,
.buynew-imgs__del {
  height: 50%;
  width: 100%;
}
.buynew-imgs__del {
  border-top: 1px #333 solid;
  margin-top: -1px;
}
.buynew-imgs__main:hover,
.buynew-imgs__del:hover {
  color: #fff;
  background: rgba(0, 0, 0, 0.6)
}
.buynew-imgs__cur {
  position: absolute;
  top:5px;
  left: 5px;
  font-size: 20px;
}
.buynew-imgs__new {
  float: right;
  position: absolute;
  right: 0;
  top: 10px;
}
</style>

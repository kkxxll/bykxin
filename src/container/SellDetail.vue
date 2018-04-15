<template>
  <div class="selldetail">
    <div class="selldetail-backbtn">
      <el-button type="primary" @click="backSeller">返回</el-button>
    </div>
    <div>{{sellDetail.author}}</div>
    <div>{{sellDetail.title}}</div>
    <div>{{sellDetail.desc}}</div>
    <div>{{this.$route.params.name}}</div>
    <div>{{ (sellDetail.meta ? sellDetail.meta.createAt : '') | formatTime }}</div>
    <div>{{sellDetail.pv}}</div>
    <div v-for="(item, idx) in sellDetail.photo" :key="idx" class="selldetail-img">
      <img :src="item" alt="">
    </div>
    <div class="sellcm">
      <h3>留言板</h3>
      <div class="sellcm-form" v-show="isAuthor">
        <el-input type="textarea" v-model="form.comment"></el-input>
        <el-button class="sellcm-submit" type="success" @click="submitCm" disabled v-if="!user">发表留言</el-button>
        <el-button class="sellcm-submit" type="success" @click="submitCm" v-else>发表留言</el-button>
        <el-button class="sellcm-setfrom" type="primary" @click="setFrom" v-show="user">聊天</el-button>
        <el-button class="sellcm-txtsubmit" type="text" @click="openSignin" v-show="!user">登录后留言</el-button>
      </div>
      <div class="sellcm-list">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="(cm, idx) in resData" :key="idx" :name="idx">
            <template slot="title">
              <span class="sellcm-name">{{cm.from}}:</span>
              <span class="sellcm-con">{{cm.content}}</span>
              <span class="sellcm-replay">{{cm.replay ? '主人已回复' : '主人未回复'}}</span>
            </template>
            <div class="replay" v-show="cm.txt">
              <span class="replay-item__name">主人回复:</span>
              <span class="replay-item__con">{{cm.replay}}</span>
            </div>
            <div class="replay-textarea" v-show="!isAuthor && cm.form">
              <el-input type="textarea" v-model="cm.replay" placeholder="添加回应"></el-input>
              <el-button class="replay-textarea__btn" type="success" @click="submitReplay(cm.id, cm.replay, idx)">回复</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data () {
    return {
      isAuthor: true,
      activeNames: [],
      form: {
        comment: '',
        replay: ''
      },
      resData: [],
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
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    const id = this.$route.params.id
    axios.get('/api/sell/detail/' + id).then((response) => {
      let res = response.data
      this.sellDetail = res.sell
      if (this.$store.state.user === this.sellDetail.author) {
        this.isAuthor = false
      }
    })

    this.getComment()
    this.getReplaly()
  },
  methods: {
    setFrom () {
      this.$store.dispatch('setToUser', this.sellDetail.author)
      this.$router.push({ name: 'Chat' })
    },
    getComment () {
      const id = this.$route.params.id
      axios.get('/api/sellcm/list/' + id).then((response) => {
        let res = response.data
        let cmdata = res.msg
        console.log(cmdata)
        let cmobj = {}

        cmdata.forEach(e => {
          cmobj = {
            from: e.from.name,
            content: e.content,
            replay: e.replay,
            id: e._id,
            txt: false,
            form: true
          }
          if (e.replay) {
            cmobj.txt = true
            cmobj.form = false
          }
          this.resData.push(cmobj)
        })
        console.log(this.resData)
      })
    },
    getReplaly () {
      console.log('dlsjflks')
    },
    openSignin () {
      this.$router.push({ name: 'Signin' })
    },
    backSeller () {
      this.$router.go(-1)
    },
    submitCm () {
      let params = {
        from: this.user,
        // to: this.sellDetail.author,
        sell: this.sellDetail._id,
        content: this.form.comment
      }
      axios.post('/api/sellcm/new', params).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log(res.msg)
        } else {
          console.log(res.msg)
        }
      })
      this.getComment()
    },
    submitReplay (id, con, idx) {
      let params = {
        id: id,
        content: con
      }
      axios.post('/api/sellcm/replay', params).then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log(res.msg)
          this.resData[idx].txt = true
          this.resData[idx].form = false
        } else {
          console.log(res.msg)
        }
      })
    },
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less">
.selldetail-backbtn {
  text-align: right;
}
.selldetail-img > img {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-collapse-item {
  text-align: left;
}
.sellcm {
  padding-right: 130px;
  width: 700px;
  margin: 0 auto 150px;
}
.sellcm-form {
  position: relative;
}
.sellcm-submit {
  position: absolute;
  right: -130px;
  top: 0;
}
.sellcm-setfrom {
  position: absolute;
  top: 45px;
  right: -130px;
}
.sellcm-txtsubmit {
  position: absolute;
  top: 40px;
  right: -130px;
}
.sellcm-name {
  font-size: 16px;
  color: #409eff;
  margin-right: 10px;
}
.sellcm-con {
  font-size: 16px;
  color: #909399;
}
.sellcm-replay {
  color: #909399;
  float: right;
  margin-right: 5px;
}
.replay-textarea {
  position: relative;
  padding-right: 110px;
}
.replay-textarea__btn {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

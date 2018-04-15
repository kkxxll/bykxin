<template>
  <div class="chat">
    <h3 class="chat-tit">聊天</h3>

    <div class="chat-main">
      <el-row>
        <el-col :span="8">
          <div class="chat-main-left">
            <ul>
              <li v-for="(item, index) in userlist" :key="index" :class="index === cur ? 'on' : ''"
              @click="showCon(item, index)">
                {{item}}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="chat-main-right">
            <ul class="chat-con-list">
              <li class="chat-con-item clr" v-for="(item, index) in conlist" :key="index">
                <div :class=" item.fl==='left' ? 'fl' : 'fr' ">
                  <span>{{item.name}}:</span>
                  <span>{{item.con}}</span>
                </div>
              </li>
            </ul>
            <div class="chat-form">
              <textarea name="" id="" cols="30" rows="10" v-model="con"></textarea>
              <el-button type="success" v-if="user" @click="sendMsg">发送</el-button>
              <el-button type="success" disabled v-else>请先登录</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
const socket = io('localhost:3334')
export default {
  data () {
    return {
      con: '',
      conlist: ['111', '222'],
      userlist: [],
      cur: 0,
      alldata: []
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    this.getList()
    var that = this
    socket.on('recvmsg', function (data) {
      let {from, to, content} = data
      that.conlist = [...that.conlist, content]

      axios.post('/api/chat/new', data).then((response) => {
        let res = response.data
        console.log(res.msg)
      })
      console.log('有人发消息了：', from, to)
    })
  },
  methods: {
    sendMsg () {
      let content = this.con
      if (content.trim() === '') {
        this.$message({
          showClose: true,
          message: '内容不能为空',
          type: 'warning',
          center: true
        })
        return
      }
      let from = this.$store.state.user
      let to = this.$store.state.toUser || 'kkk'
      let data = {
        from,
        to,
        content: this.con
      }
      socket.emit('sendmsg', data)
    },
    getList () {
      const user = this.$store.state.user
      axios.get('/api/chat/list/' + user).then((response) => {
        let res = response.data
        let chatdata = res.msg
        console.log(chatdata)
        this.alldata = chatdata
        chatdata.forEach(e => {
          if (e.from === user && !this.userlist[e.to]) {
            this.userlist.push(e.to)
          } else {
            if (this.userlist.indexOf(e.from) === -1) {
              this.userlist.push(e.from)
            }
          }
        })
        // let cmobj = {}

        // cmdata.forEach(e => {
        //   cmobj = {
        //     from: e.from.name,
        //     content: e.content,
        //     replay: e.replay,
        //     id: e._id,
        //     txt: false,
        //     form: true
        //   }
        //   if (e.replay) {
        //     cmobj.txt = true
        //     cmobj.form = false
        //   }
        //   this.resData.push(cmobj)
        // })
        // console.log(this.resData)
      })
    },
    showCon (name, index) {
      this.cur = index
      let conArr = []
      let conObj = {}
      this.alldata.forEach(e => {
        conObj.con = e.content
        if (e.from === name && e.to === this.user) {
          conObj.name = name
          conObj.fl = 'left'
          conArr.push(conObj)
        } else if (e.to === name && e.from === this.user) {
          conObj.fl = 'right'
          conObj.name = this.user
          conArr.push(conObj)
        } else {
        }
      })
      this.conlist = conArr
    }
  }
}
</script>
<style lang="less" scoped>
li {
  list-style: none;
}
.chat-main-left,
.chat-main-right {
  border: 1px solid #eee;
  height: 700px;
  padding-bottom: 100px;
  position: relative;
}
.chat-main-left .on {
  color: red;
}
.chat-main-left li {
  cursor: pointer;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clr:after {
  content: '.';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.chat-form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #eee;
  text-align: left;
  & textarea {
    width: 70%;
    height: 100%;
    vertical-align: top;
  }
  & button {
    vertical-align: top;
  }
}
</style>

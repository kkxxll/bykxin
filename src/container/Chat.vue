<template>
  <div class="chat">
    <h3 class="chat-tit">聊天</h3>

    <div class="chat-main">
      <el-row>
        <el-col :span="8">
          <div class="chat-main-left">
            <ul>
              <li class="on">用户1</li>
              <li>用户1</li>
              <li>用户1</li>
              <li>用户1</li>
              <li>用户1</li>
              <li>用户1</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="chat-main-right">
sdf
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
}
</script>
<style lang="less" scoped>
.chat-main-left,
.chat-main-right {
  border: 1px solid #eee;
  height: 700px;
}
.chat-main-left .on {
  color: red;
}
.chat-main-left li {
  cursor: pointer;
}
</style>

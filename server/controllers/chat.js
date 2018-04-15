var Chat = require('../models/chat')

exports.list = function (req, res) {
  let user = req.params.user

  console.log(user)

  Chat.find({ $or: [{ from: user }, { to: user }] })
    .sort('meta.createAt')
    .exec(function (err, doc) {
      console.log(doc)
      if (!err) {
        res.json({
          status: '0',
          msg: doc
        })
      }
    })
}

// 存from
exports.save = function (req, res) {
  var chatObj = {
    from: req.body.from,
    content: req.body.content,
    to: req.body.to
  }
  console.log(chatObj)

  let _chat = new Chat(chatObj)
  _chat.save(function (err, chat) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (chat) {
        res.json({
          status: '0',
          msg: '添加聊天记录成功'
        })
      }
    }
  })
}

var Sellcm = require('../models/sellcm')
var User = require('../models/user')
var Sell = require('../models/sell')

exports.list = function (req, res) {
  let sellId = req.params.id
  // console.log(sellId)
  Sellcm.find({ sell: sellId })
    .populate('from', 'name')
    .sort('meta.createAt')
    .exec(function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        // console.log(doc)
        res.json({
          status: '0',
          msg: doc
        })
      }
    })
}

// 存from
exports.save = function (req, res) {
  var commentObj = {
    from: req.body.from,
    content: req.body.content,
    sell: req.body.sell
  }

  var fun = async function () {
    await User.findOne({ name: commentObj.from }, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        if (doc) {
          // console.log(doc)
          commentObj.from = doc._id
        }
      }
    })
    await Sell.findOne({ _id: commentObj.sell }, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        if (doc) {
          commentObj.sell = doc._id
        }
      }
    })
    let _comment = new Sellcm(commentObj)
    _comment.save(function (err, comment) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        if (comment) {
          res.json({
            status: '0',
            msg: '添加留言成功'
          })
        }
      }
    })
  }

  fun()
}

exports.replay = function (req, res) {
  let id = req.body.id
  let content = req.body.content

  Sellcm.findOne({ _id: id }, function (err, doc) {
    if (err) {
      console.log(err)
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        doc.replay = content
      }
      doc.save(function (err) {
        if (err) {
          console.log(err)
        }
        res.json({
          status: '0',
          msg: '添加回复成功'
        })
      })
    }
  })
}

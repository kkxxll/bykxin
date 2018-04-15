var Sell = require('../models/sell')
var fs = require('fs')
var path = require('path')
var Category = require('../models/category')

exports.save = function (req, res) {
  var sellObj = {
    author: req.body.author,
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    category: req.body.category,
    photos: req.poster
  }
  // console.log(sellObj)
  if (
    sellObj.author &&
    sellObj.title &&
    sellObj.desc &&
    sellObj.price &&
    sellObj.category &&
    sellObj.photos
  ) {
    Category.findOne({ name: sellObj.category }, function (err, catename) {
      if (err) {
        console.log(err)
      } else {
        sellObj.categoryId = catename._id
      }
      var _sell = new Sell({
        author: sellObj.author,
        title: sellObj.title,
        desc: sellObj.desc,
        price: sellObj.price,
        photo: sellObj.photos,
        category: catename._id
      })
      _sell.save(function (err, sell) {
        console.log(sell.category)
        if (err) {
          console.log(err)
        } else {
          Category.findById(sellObj.categoryId, function (err, doc) {
            if (err) {
              console.log(err)
            } else {
              doc.sells.push(sell._id)
              doc.save(function (err) {
                if (err) {
                  console.log(err)
                }
              })
              // window.location('/kkkkkkk')
              res.json({
                status: '0',
                msg: '出售商品添加成功'
              })
            }
          })
        }
      })
    })
  } else {
    res.json({
      status: '1',
      msg: '信息填写不完整'
    })
  }
}

exports.allsell = function (req, res) {
  Sell.find({})
    .sort('meta.createAt')
    .exec(function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        res.json({
          status: '0',
          sells: doc
        })
      }
    })
}
exports.list = function (req, res) {
  let id = req.params.id

  Sell.find({ category: id })
    .sort('meta.createAt')
    .exec(function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        res.json({
          status: '0',
          sells: doc
        })
      }
    })
}
exports.listsell = function (req, res) {
  let name = req.params.name
  Sell.find({ author: name })
    .sort('meta.createAt')
    .exec(function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        res.json({
          status: '0',
          sells: doc
        })
      }
    })
}
exports.detail = function (req, res) {
  let id = req.params.id
  Sell.update({ _id: id }, { $inc: { pv: 1 } }, function (err) {
    if (err) {
      console.log(err)
    }
  })
  Sell.findOne({ _id: id }).exec(function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      res.json({
        status: '0',
        sell: doc
      })
    }
  })
}
exports.search = function (req, res) {
  let q = req.params.q
  Sell.find({ title: new RegExp(q + '.*', 'i') }).exec(function (err, sells) {
    if (err) {
      console.log(err)
    }
    res.json({
      status: '0',
      result: sells
    })
  })
}

exports.savePhoto = function (req, res, next) {
  let photos = req.files.photo
  let arr = []
  let formatarr = []
  if (!(photos instanceof Array)) {
    // 不是数组，即只有一张图片
    arr.push(photos)
  } else {
    arr = photos
  }

  let len = arr.length
  let flag = 0

  arr.forEach(ele => {
    let filePath = ele.path
    let originalFilename = ele.originalFilename
    if (originalFilename) {
      fs.readFile(filePath, function (err, data) {
        if (err) {
          console.log(err)
        }
        var timestamp = Date.now()
        var type = ele.type.split('/')[1]
        var poster = timestamp + '.' + type
        var newPath = path.join(__dirname, '../../', '/src/assets/' + poster)
        fs.writeFile(newPath, data, function (err) {
          if (err) {
            console.log(err)
          }
          formatarr.push(poster)
          flag++
          if (flag === len) {
            req.poster = formatarr
            next()
          }
        })
      })
    }
  })
}

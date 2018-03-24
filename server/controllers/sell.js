// var mongoose = require('mongoose')
var Sell = require('../models/sell')
var Category = require('../models/category')

exports.save = function (req, res) {
  var sellObj = {
    author: req.body.author,
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    photo: req.body.photo,
    category: req.body.category
  }
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
      photo: sellObj.photo,
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
            res.json({
              status: '0',
              msg: '出售商品添加成功'
            })
          }
        })
      }
    })
  })
}

exports.list = function (req, res) {
  let id = req.params.id
  Sell.find({category: id}).sort('meta.createAt').exec(function (err, doc) {
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

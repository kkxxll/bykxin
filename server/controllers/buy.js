var mongoose = require('mongoose')
var Buy = require('../models/buy')
var Category = require('../models/category')

exports.save = function (req, res) {
  var buyObj = {
    author: req.body.author,
    title: req.body.title,
    desc: req.body.desc,
    // price: req.body.price,
    photo: req.body.photo,
    category: req.body.category
  }
  Category.findOne({ name: buyObj.category }, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      buyObj.categoryId = doc._id
    }
  })
  var _buy = new Buy({
    author: buyObj.author,
    title: buyObj.title,
    desc: buyObj.desc,
    // price: buyObj.price,
    photo: buyObj.photo,
    category: new mongoose.Types.ObjectId(buyObj.categoryId)
  })

  _buy.save(function (err, buy) {
    console.log(buy.category)
    if (err) {
      console.log(err)
    } else {
      Category.findById(buyObj.categoryId, function (err, doc) {
        if (err) {
          console.log(err)
        } else {
          doc.buys.push(buy._id)
          doc.save(function (err) {
            if (err) {
              console.log(err)
            }
          })
          res.json({
            status: '0',
            msg: '求购商品添加成功'
          })
        }
      })
    }
  })
}

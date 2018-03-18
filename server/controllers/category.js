var Category = require('../models/category')

// exports.new = function (req, res) {
//   res.render('category_admin', {
//     title: '分类录入页',
//     catetories: {}
//   })
// }
exports.save = function (req, res) {
  let param = {
    name: req.body.category
  }

  Category.findOne({ name: param.name }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        res.json({
          status: '2',
          msg: '分类名已存在'
        })
      } else {
        let _category = new Category(param)
        _category.save()
        res.json({
          status: '0',
          msg: '分类名新增成功'
        })
      }
    }
  })
}
// list page
exports.list = function (req, res) {
  Category.fetch(function (err, categories) {
    if (err) {
      console.log(err)
    }
    res.json({
      status: '0',
      categories: categories
    })
  })
}

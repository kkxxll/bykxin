var User = require('../models/user')

// exports.showSignup = function (req, res) {
//   res.render('signup', {
//     title: '用户注册页'
//   })
// }
// exports.showSignin = function (req, res) {
//   res.render('signin', {
//     title: '用户登录页'
//   })
// }

exports.signin = function (req, res) {
  let param = {
    name: req.body.userName,
    password: req.body.userPass
  }
  User.findOne({ name: param.name }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (!doc) {
        res.json({
          status: '2',
          msg: '该用户名还未注册'
        })
        return
      }
      if (doc.password === param.password) {
        res.json({
          status: '0',
          msg: '登录成功'
        })
      } else {
        res.json({
          status: '1',
          msg: '密码错误'
        })
      }
    }
  })
}
exports.signup = function (req, res) {
  let param = {
    name: req.body.userName,
    password: req.body.userPass
  }
  console.log(param)

  User.findOne({ name: param.name }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        res.json({
          status: '2',
          msg: '用户名已存在'
        })
      } else {
        let _user = new User(param)
        _user.save()
        res.json({
          status: '0',
          msg: '注册成功'
        })
      }
    }
  })
}
exports.list = function (req, res) {
  User.fetch(function (err, users) {
    if (err) {
      console.log(err)
    }
    res.json({
      status: '0',
      users: users
    })
  })
}

exports.del = function (req, res) {
  let name = req.body.name
  User.remove({ name: name }, function (err, book) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        users: '删除成功'
      })
    }
  })
}
// exports.signin = function (req, res) {
//   var _user = req.body.user
//   var name = _user.name
//   var password = _user.password

//   User.findOne({ name: name }, function (err, user) {
//     if (err) {
//       console.log(err)
//     }
//     if (!user) {
//       return res.redirect('/signup')
//     }

//     user.comparePassword(password, function (err, isMatch) {
//       if (err) {
//         console.log(err)
//       }
//       if (isMatch) {
//         req.session.user = user
//         res.redirect('/')
//       } else {
//         res.redirect('/signin')
//         // console.log('not match')
//       }
//     })
//   })
// }
// exports.logout = function (req, res) {
//   delete req.session.user
//   // delete app.locals.user
//   res.redirect('/')
// }

// exports.signinRequired = function (req, res, next) {
//   var user = req.session.user
//   if (!user) {
//     return res.redirect('/signin')
//   }
//   next()
// }
// exports.adminRequired = function (req, res, next) {
//   var user = req.session.user
//   if (user.role <= 10) {
//     return res.redirect('/signin')
//   }
//   next()
// }

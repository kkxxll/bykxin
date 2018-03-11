// var User = require('../models/user')

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

exports.signup = function (req, res) {
  var _user = req.body
  console.log(_user)

  // User.findOne({ name: _user.name }, function (err, user) {
  //   if (err) {
  //     console.log(err)
  //   }
  //   if (user) {
  //     return res.redirect('/signin')
  //   } else {
  //     var user = new User(_user)

  //     user.save(function (err, user) {
  //       if (err) {
  //         console.log(err)
  //       }

  //       res.redirect('/')
  //     })
  //   }
  // })
}
// exports.list = function (req, res) {
//   User.fetch(function (err, users) {
//     if (err) {
//       console.log(err)
//     }
//     res.render('userlist', {
//       title: '用户列表页',
//       users: users
//     })
//   })
// }

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

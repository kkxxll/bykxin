var User = require('../models/user')

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
      }
      if (doc.password === param.password) {
        req.session.user = doc.name
        req.session.role = doc.role
        // console.log(req.session)
        let data = {
          name: doc.name,
          rank: doc.role
        }
        res.json({
          status: '0',
          msg: data
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
exports.userinfo = function (req, res) {
  let username = req.session.user
  if (username) {
    User.findOne({ name: username }, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        if (!doc) {
          res.json({
            status: '2',
            msg: '该用户不存在'
          })
        } else {
          res.json({
            status: '0',
            msg: doc
          })
        }
      }
    })
  } else {
    res.json({
      status: '3',
      msg: '用户cookie过期'
    })
  }
}
exports.logout = function (req, res) {
  delete req.session.user
  delete req.session.role
  res.json({
    status: '0',
    msg: '已退出'
  })
}
exports.showSignin = function (req, res) {
  // 返回用户名和权限
  let data = {
    user: req.session.user,
    role: req.session.role
  }
  res.json({
    status: '0',
    msg: data
  })
}

var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var multiparty = require('connect-multiparty')

var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/bykxin')
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail.')
})

var index = require('./routes/index')
var users = require('./routes/users')
var category = require('./routes/category')
var sell = require('./routes/sell')
var buy = require('./routes/buy')
var sellcm = require('./routes/sellcm')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(multiparty())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(session({
  secret: 'byxin5',
  name: 'bykxin559',
  cookie: { maxAge: 60000 },
  // 60s
  resave: true,
  rolling: true,
  saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')))

// app.use(function (req, res, next) {
//   next()
// })

app.use('/api', index)
app.use('/api/users', users)
app.use('/api/category', category)
app.use('/api/sell', sell)
app.use('/api/buy', buy)
app.use('/api/sellcm', sellcm)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

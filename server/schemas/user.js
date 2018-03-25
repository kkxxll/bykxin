var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
  role: {
    type: Number,
    default: 0
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  },
  buy: [{ type: String }],
  sell: [{ type: String }]
})

UserSchema.methods = {
  comparePassword: function (_password, cb) {
    bcrypt.compare(_password, this.password, function (err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch)
    })
  }
}

UserSchema.statics = {
  fetch: function (cb) {
    return this.find({})
      .sort('meta.createAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this.findOne({ _id: id }).exec(cb)
  }
}
module.exports = UserSchema

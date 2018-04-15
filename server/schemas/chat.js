var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var ObjectId = Schema.Types.ObjectId

var ChatSchema = new Schema({
  from: String,
  to: String,
  content: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})
ChatSchema.statics = {
  fetch: function (cb) {
    return this.find({})
      .sort('meta.createAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this.findOne({ _id: id }).exec(cb)
  }
}

module.exports = ChatSchema

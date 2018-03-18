// var Sell = require('../models/sell')

// exports.save = function (req, res) {
//   var id = req.body.book._id
//   var bookobj = req.body.book
//   var _book

//   if (req.poster) {
//     bookobj.poster = req.poster
//   }
//   if (id != 'undefined') {
//     // console.log('1111111111111')
//     Sell.findById(id, function (err, book) {
//       if (err) {
//         console.log(err)
//       }
//       _book = _.extend(book, bookobj)
//       _book.save(function (err, book) {
//         if (err) {
//           console.log(err)
//         }
//         res.redirect('/book/' + book._id)
//       })
//     })
//   } else {
//     // console.log('111111111111122222')
//     _book = new Sell({
//       author: bookobj.author,
//       title: bookobj.title,
//       year: bookobj.year,
//       pages: bookobj.pages,
//       isbn: bookobj.isbn,
//       poster: bookobj.poster,
//       categroy: bookobj.category
//     })
//     var categoryId = bookobj.category
//     _book.save(function (err, book) {
//       if (err) {
//         console.log(err)
//       }
//       Category.findById(categoryId, function (err, category) {
//         category.books.push(book._id)
//         category.save(function (err, category) {
//           res.redirect('/book/' + book._id)
//         })
//       })
//     })
//   }
// }

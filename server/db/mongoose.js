const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/PostApp', { useNewUrlParser: true })

module.exports = mongoose
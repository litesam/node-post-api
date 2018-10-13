const mongoose = require('../db/mongoose')

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = User
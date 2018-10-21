const mongoose = require('../db/mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

var User = mongoose.model('User', UserSchema)

module.exports = User
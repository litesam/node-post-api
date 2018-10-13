const mongoose = require('../db/mongoose')

const Post = mongoose.model('Post', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    comments: [{
        body: String,
    }]
})

module.exports = Post
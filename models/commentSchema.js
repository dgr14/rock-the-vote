const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const commentSchema = new Schema ({
    body: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)
module.exports = commentSchema
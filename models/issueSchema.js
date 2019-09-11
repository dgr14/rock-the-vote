// Importing my commentSchema to use in my issueSchema as my comments
// import commentSchema from './commentSchema'
// const { commentSchema } = require('./commentSchema')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

// might not need
const commentSchema = new Schema ({
    body: {
        type: String,
        required: true
    }
})

const issueSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    voteCounter: {
        type: Number,
        required: true,
        default: 0
    },
    comments: [commentSchema]
})

module.exports = mongoose.model("Issue", issueSchema)
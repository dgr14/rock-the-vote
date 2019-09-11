const express = require("express")
const app = express()
// require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7000
const path = require('path')
const secret = process.env.SECRET || 'some secret saying here for the purposes of local development'

// Middlewares (for every request)
app.use(express.json()) // req.body = Object from POST and PUT requests
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/issues",
{ useNewUrlParser: true, useCreateIndex: true },
(err => {
    if (err) throw err;
    console.log(`Connected to the database`);
        }
    )
)

app.use(("/issues"), require('./routes/issueRouter'))

// Global Server Error Handler - handles ANY thrown error from ANY of our routes above
app.use((err, req, res, next) => {
    console.log(err);
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({message: err.message })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}`)
})
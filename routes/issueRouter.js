const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issueSchema.js')

// issueRouter.get('/:issueId', (req, res, next) => {
//     console.log(req.params)
//     Issue.findOne({_id: req.params.issueId}, (err, issue) => {
//         if(err) {
//             res.status(500)
//             return next (err)
//         }
//         if (!issue) {
//             res.status(404)
//             return next (new Issue("No Topic found"))
//         }
//         return res.send(issue)
//     })
// })

// GET ALL
issueRouter.get("/", (req, res, next) => {
    // Addition
    Issue.find((err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

// write another post request with the issueId and the comment

issueRouter.post("/", (req, res, next) => {
    console.log(req.body)
    const issue = new Issue(req.body)

    issue.save((err, newIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newIssue)
    })
})

issueRouter.put("/:_id", (req, res, next) => {
    const newObject = req.body
    Issue.findOneAndUpdate(
        {_id: req.params._id},                  // 1. the _id of the item to update
        //adding to array thats inside data     
        newObject,                              // 2. The update, if you use just req.body, it will update the object
        {new: true}, (err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            console.log(updatedIssue)
            return res.status(201).send(updatedIssue)
        }
    )
})

// put request for adding comments to my comment array
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOne({_id: req.params._id}, (err, foundIssue) => {
        if(err){
            res.status(500)
            return next (err)
        }
        newArr = [...foundIssue.comments, req.body]
        Issue.findOneAndUpdate(
            {_id: req.params._id},
            {comments: [...newArr]},
            {new: true},
            (err, updatedIssue) => {
                if(err){
                    res.status(500)
                    return next (err)
                }
                return res.status(201).send(updatedIssue)
            }
        )
    })
})

// Add like - Put request - INCREMENTING
// How do I connect this to a front end incrementer?
issueRouter.put("/issue/:_id", (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params._id},
        {$inc: {voteCounter: 1}}, // how do I make sure people can downvote as well? Should I pass a second argument that adds the user who just voted?
        {new: true},
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

// would I use issueId or _id?
issueRouter.get('/:issueId', (req, res, next) => {
    console.log(req.params)
    Issue.findOne({_id: req.params.issueId}, (err, issue) => {
        if(err) {
            res.status(500)
            return next (err)
        }
        if (!issue) {
            res.status(404)
            return next (new Issue("No Topic found"))
        }
        return res.send(issue)
    })
})

issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndRemove({_id: req.params.issueId}, (err, deletedIssue) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send({issue: deletedIssue, msg: `Successfully deleted the topic`})
    })
})

module.exports = issueRouter
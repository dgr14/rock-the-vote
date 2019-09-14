const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issueSchema.js')

// GET ALL
issueRouter.get("/", (req, res, next) => {
    // Addition
    Issue.find((err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.send(issues)
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
        {_id: req.params._id},
        //adding to array thats inside data
        newObject,
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
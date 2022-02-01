const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")


router.get('/user/:id', requireLogin, (req,res)=>{
    User.findOne({_id : req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy : req.params.id})
        .populate("postedBy", "_id name")
        .exec((err, posts)=>{
            if(err){
                res.status(422).json({error:err})
            }
            res.json({user, posts})
        })
    }).catch(err=>{
        res.status(404).json({error : "user not found!"})
    })
})

module.exports = router;
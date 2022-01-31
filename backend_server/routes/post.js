const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const Post = mongoose.model("Post")


router.get('/myposts', requireLogin, (req,res)=>{
    // console.log(req.user);
    Post.find({postedBy : req.user._id})
    .populate("postedBy", "_id name")
    .then(mypost=>{
        res.json({mypost})
    }).catch(err=>console.log(err))
})

router.get('/allposts', requireLogin, (req,res)=>{
    Post.find().populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts:posts})
    }).catch(err=>console.log(err))
})

router.post('/createpost', requireLogin,  (req,res)=>{
    const {title,caption, pic} = req.body;
    if(!title || !caption || !pic){
        // return res.status(422).json({error : "Please fill all the fields"});
        return res.json({error : "Please fill all the fields"});
    }
    const post = new Post({
        title,
        caption,
        photo : pic,
        postedBy : req.user
        //this req.user is comming from requireLogin middleware
    })
    post.save().then(result=>{
        res.json({post : result})
    })
    .catch(err=>console.log(err))
})

router.put('/like', requireLogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push : {likes : req.user._id}
    },{
        new : true
    }).exec((err,result)=>{
        if(err)
            res.status(422).json({error:err})
        else{
            // console.log(result);
            res.json(result)
        }
            
    })
})


router.put('/unlike', requireLogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull : {likes : req.user._id}
    },{
        new : true
    }).exec((err,result)=>{
        if(err)
            res.status(422).json({error:err})
        else
            res.json(result)
    })
})

module.exports = router;
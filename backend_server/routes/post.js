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
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy", "_id name")
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
    // console.log(req.body.postId);
    // console.log(req.user._id);
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


router.put('/comment', requireLogin,(req,res)=>{
    // console.log(req.user._id);
    // const {text, postedBy} = req.body
    const comment = {
        text : req.body.text,
        postedBy : req.user._id
    }
    // console.log(comment);
    // console.log(req.body.postedBy);
    Post.findByIdAndUpdate(req.body.postedBy,{
        $push : {comments : comment}
    },{
        new : true
    })
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err,result)=>{
        if(err)
            res.status(422).json({error:err})
        else{
            // console.log(result);
            res.json(result)
        }
            
    })
})


router.delete('/delete/:postId', requireLogin, (req,res)=>{
    // console.log(req.params.postId);
    // we are accessing via params bcz delete rount won't accept any body from client.
    // i am just assuming
    Post.findOne({_id : req.params.postId})
    .populate("postedBy", "_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error : err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err);
            })
        }
    })
})


module.exports = router;
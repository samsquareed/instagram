const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} =require('../keys')

router.get('/', (req,res)=>{
    res.send("Home page")
})

router.post('/signup', (req,res)=>{
    // console.log(req.body.name);
    const { name, email, password} = req.body
    if(!email || !name || !password)
        return res.status(422).json({error : "Please provide all the credentials"})
    // res.json({message : "successfully registered"})
    User.findOne({email : email})
    .then((savedUser)=>{
        if(savedUser)
            return res.status(409).json({error : "user already present"})
        
        bcrypt.hash(password, 10)
        .then(hashedPassword =>{
            const user = new User({
                email,
                password:hashedPassword,
                name
            })
            user.save()
            .then(user=>{
                return res.status(201).json({message : "Registered successfully"})
            })
            .catch((err) =>{
                console.log(err)
            })
            })
    })
})

router.post('/signin',(req,res)=>{
    const { email, password} = req.body;
    if(!email || !password)
        return res.status(422).json({error : "email or password is missing"})
    User.findOne({email : email})
    .then(savedUser=>{
        if(!savedUser)
            return res.status(422).json({error : "user not found"})
        bcrypt.compare(password,savedUser.password)
        .then(matched=>{
            if(matched){
                // return res.status(200).json({message : "signed successfully"})
                const token = jwt.sign({_id : savedUser._id}, JWT_SECRET);
                res.json({token}); 
            }
            else
                res.status(422).json({error : "Invalid credentials"})
        })
        .catch(err=>console.log(err))
    })
})

module.exports = router;

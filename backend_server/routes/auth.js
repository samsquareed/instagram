const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const {JWT_SECRET} =require('../keys')
const requireLogin = require('../middlewares/requireLogin')
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', (req,res)=>{
    res.send("Home page")
})

router.get('/protected', requireLogin, (req,res)=>{
    res.send("This is protedted page")
})

router.post('/signup', (req,res)=>{
    // console.log(req.body.name);
    const { name, email, password, pic} = req.body
    if(!email || !name || !password)
        return res.json({error : "Please provide all the credentials"})
    // res.json({message : "successfully registered"})
    User.findOne({email : email})
    .then((savedUser)=>{
        if(savedUser)
            return res.json({error : "user already present"})
        
        bcrypt.hash(password, 10)
        .then(hashedPassword =>{
            const user = new User({
                email,
                password:hashedPassword,
                name,
                pic
            })
            user.save()
            .then(user=>{
                return res.status(201).json({message : "Registered successfully now you can Login"})
            })
            .catch((err) =>{
                console.log(err)
            })
            })
    })
})

router.post('/signin',(req,res)=>{
    const { email, password} = req.body;
    if(!email || !password){
        // return res.status(422).json({error : "email or password is missing"})
        return res.json({error : "email or password is missing"})
    }
        
    User.findOne({email : email})
    .then(savedUser=>{
        if(!savedUser){
            // return res.status(422).json({error : "user not found"})
            return res.json({error : "user not found"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(matched=>{
            if(matched){
                // return res.status(200).json({message : "signed successfully"})
                const token = jwt.sign({_id : savedUser._id}, JWT_SECRET);
                const {_id, name, email, followers, following, pic} = savedUser;
                res.json({token, user :{_id, name, email,followers, following,pic}}); 
            }
            else{
                // res.status(422).json({error : "Invalid credentials"})
                res.json({error : "Invalid credentials"})
            }
                
        })
        .catch(err=>console.log(err))
    })
})

module.exports = router;

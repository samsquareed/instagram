

// const {JWT_SECRET} = require('../keys')
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next) =>{
    // console.log(req.headers);

    const {authorization} = req.headers;
    if(!authorization)
        res.status(401).json({error:"You must be logged in!"})
    // console.log(authorization.replace("Bearer ",""))
    const token = authorization.replace("Bearer ","");
    // console.log("login success");
    // console.log(token);
    jwt.verify(token,JWT_SECRET,(err, payload)=>{
        if(err)
            res.json({error : "Login failed"})
        // console.log(payload);
        // console.log(payload); it looks something like this : { _id: '61f6593efa9af3b36f84151e', iat: 1643540492 }
        //then we destructure _id from the payload and search that in database and 
        //database returned the entire details about that user id = _id
        const {_id} = payload
        User.findById(_id).then(userData=>{  
            /*
            console.log(userData); o/p :
             {
                _id: new ObjectId("61f6593efa9af3b36f84151e"),
                name: 'shreyank',
                email: 'shreyank05@gmail.com',
                password: '$2a$10$oD9F6QOYGopBrfrLY1C3l.ImohSCN2PV3u7hQ6XQVZfje.xZzV7r2',
                __v: 0
            }
            */
            req.user = userData
            next()
        })
        
    })
}
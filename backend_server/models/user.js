const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    pic :{
        type : String,
        default : "https://res.cloudinary.com/samsquare/image/upload/v1643953582/p1mz1q4fihx5neemfeyl.png"
    },
    followers : [{type:ObjectId, ref:"User", unique : true}],
    following : [{type:ObjectId, ref:"User",unique : true}]
})

mongoose.model("User", userSchema);
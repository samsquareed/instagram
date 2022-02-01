const express = require('express')
const app= express();
app.use(express.json())
const PORT = 3001;
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose')
// const {MONGOURI} =require('./keys')
require('dotenv').config();
const MONGOURI = process.env.MONGOURI;

mongoose.connect(MONGOURI);
mongoose.connection.on('connected', ()=>{
    console.log("Connected to db");
})

mongoose.connection.on('error', ()=>{
    console.log("error in connecting");
})

require('./models/user')
require('./models/post')
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`);
})
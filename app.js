const express = require('express')
const mongoose = require('mongoose')

const app = express();

app.use(express.json());

app.use('/api',(req,res)=>{
    res.send({message:"Api Fetch"})
})

app.use('/',(req,res)=>{
    res.send({message:"Api Home Fetch"})
})

app.listen(2000,()=>{
    console.log("server start on 2000")
})
















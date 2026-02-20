const express = require('express')
const mongoose = require('mongoose')
const userRouter = require("./Routers/userRouter")

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/E-Commerce")
    .then(()=>{
        console.log("Mongodb Connect Succesfully");
    })
    .catch((err)=>{
        console.log({"Err":err})
    })


app.use('/api/user',userRouter)


app.listen(2000,()=>{
    console.log("server start on 2000")
})
















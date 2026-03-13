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
app.use("/",(req,res)=>{
    res.send("Hello Bro")
    res.end()
})

PORT = 2232
app.listen(PORT,()=>{
    console.log(`server start on http://localhost:${PORT} `)
})
















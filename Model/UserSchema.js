const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    profileImage:{
        type:String,
        default:"https://www.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_135438313.htm#fromView=keyword&page=1&position=5&uuid=8abe6b73-38b2-4536-9f8c-73a62e71d67b&query=Default+user"
    }
})


module.exports = mongoose.model("User",userSchema);
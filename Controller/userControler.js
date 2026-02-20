
const User = require("../Model/UserSchema")

exports.addUser = async (req,res) =>{
    try{
        const user = new User(req.body)
        await user.save();

        res.status(201).json({
            message:"User Created",
            data:user
        })
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}


exports.getUsers = async (req,res) =>{
    try{
        const user = await User.find();

        res.status(200).json({
            message:"user Fetch succesfully",
            data:user
        })

    } catch(err){
        res.status(500).json({error:err.message})
    }
}






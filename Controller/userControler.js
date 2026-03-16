
const User = require("../Model/UserSchema")

exports.addUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save();

        if(req.file){
            user.profileImage = req.file.path
        }
        
        res.status(201).json({
            message: "User Created",
            data: user
        })
        console.log({"user=":user})
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.getUsers = async (req, res) => {
    try {
        const user = await User.find();

        res.status(200).json({
            message: "user Fetch succesfully",
            data: user
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getOneUser = async (req,res)=>{
    try{
        const OneUser = await User.findById(req.params.id)

        res.status(200).json({
            message:"User Fetch Succesfully",
            data:OneUser
        })
        
    }catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.patchUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not Found" });
        }

        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(200).json({ error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteUser = await User.findByIdAndDelete(id)

        if (!deleteUser) {
            res.status(404).json({ message: "User Not Found" })
        }

        res.status(200).json({
            message: "User Deleted",
            data: deleteUser
        })
    }
    catch (err) {
        res.status(400).json({ err: err.message })
    }

}





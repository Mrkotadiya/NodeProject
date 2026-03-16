
const User = require("../Model/UserSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.addUser = async (req, res) => {
    try {

        const data = { ...req.body }

        // profile image
        if (req.file) {
            data.profileImage = req.file.path
        }

        // hash password
         if (data.password) {
            const salt = await bcrypt.genSalt(10)
            data.password = await bcrypt.hash(data.password, salt)
        }

        const user = new User(data)

        await user.save()


        res.status(201).json({
            message: "User Created",
            data: user
        })

        console.log({ user: user })

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        // check email
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        // create token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            "secretkey",
            {
                expiresIn: "1d"
            }
        )

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage
            }
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").lean();

        res.status(200).json({
            message: "user Fetch succesfully",
            data: users
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getOneUser = async (req,res)=>{
    try{
        const OneUser = await User.findById(req.params.id).select("-password").lean()

        res.status(200).json({
            message:"User Fetch Succesfully",
            data:OneUser
        })
        
        if(!OneUser){
            return res.status(404).json({message:"User Not Found"})
        }

    }catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.patchUser = async (req, res) => {
    try {

        const updateData = { ...req.body }

        if (req.file) {
            updateData.profileImage = req.file.filename
        }

        if (updateData.password) {
            const salt = await bcrypt.genSalt(10)
            updateData.password = await bcrypt.hash(updateData.password, salt)
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            {
                new: true,
                runValidators: true
            }
        ).select("-password")

        if (!updatedUser) {
            return res.status(404).json({ message: "User not Found" })
        }

        res.status(200).json(updatedUser)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {

        const deleteUser = await User.findByIdAndDelete(req.params.id)

        if (!deleteUser) {
            return res.status(404).json({ message: "User Not Found" })
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





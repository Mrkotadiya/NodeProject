const express = require("express")
const { addUser, getUsers, patchUser, deleteUser, getOneUser, loginUser} = require("../Controller/userControler")
const authMiddleware = require("../Middleware/authMiddleware")

const router = express.Router()

router.post("/adduser",addUser)
router.post("/login",loginUser)
router.get("/getusers",getUsers)
router.get("/getoneuser/:id",getOneUser)
router.patch("/updateuser/:id",authMiddleware,patchUser)
router.delete("/deleteuser/:id",authMiddleware,deleteUser)

module.exports= router








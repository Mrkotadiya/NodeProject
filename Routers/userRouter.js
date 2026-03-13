const express = require("express")
const { addUser, getUsers, patchUser, deleteUser, getOneUser} = require("../Controller/userControler")

const router = express.Router()

router.post("/adduser",addUser)
router.get("/getusers",getUsers)
router.get("/getoneuser/:id",getOneUser)
router.patch("/updateuser/:id",patchUser)
router.delete("/deleteuser/:id",deleteUser)

module.exports= router








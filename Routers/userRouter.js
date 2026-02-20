const express = require("express")
const { addUser, getUsers } = require("../Controller/userControler")


const router = express.Router()

router.post("/adduser",addUser)
router.get("/addusers",getUsers)


module.exports = router








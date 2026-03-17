const jwt = require("jsonwebtoken")

const SECRET = "secretkey"

const authMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization

        // check header
        if (!authHeader) {
            return res.status(401).json({
                message: "Access denied. No token provided"
            })
        }

        //  check format
        if (!authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "Invalid token format"
            })
        }

        // extract token
        const token = authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            })
        }

        console.log("TOKEN:", token) // debug

        //  verify token
        const decoded = jwt.verify(token, SECRET)

        req.user = decoded

        next()

    } catch (err) {
        console.log("JWT ERROR:", err.message) // 🔥 VERY IMPORTANT

        res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = authMiddleware


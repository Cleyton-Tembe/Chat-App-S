import jwt from "jsonwebtoken"
import User from "../Models/user.js"

const ProtectRoute = async (req, res, next) => {
    
    try {
        
        const token = req.cookies.jwt

        if(!token) {
            return res.status(401).json({message: "Unauthorized - No Token Provided"})
        }

        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedtoken) {
            return res.status(401).json({message: "Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decodedtoken.userid).select("-password")

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        req.user = user

        next()

    } catch (error) {
        console.error("ERROR Protected Middleware:", error.message)
        res.status(500).json({message: "Internal ERRO"})
    }

}

export default ProtectRoute
import User from "../Models/user.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../Utils/gentoken.js";

const SignUp = async (req, res) => {

    
    try {
        
        const {fullname, email, password} = req.body;

        if(!password || !email || !fullname) return res.status(400).json({message: "All fields must be filled"})

        if (password.length < 4) {
            return res.status(400).json({message:"Password must contain at least 4 characters"})
        }

        const user = await User.findOne({email})

        if(user)  return res.status(400).json({message: "This email is already been used"})
        
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt)
        
        const newuser = new User({
            fullName: fullname,
            email: email,
            password: hashedpassword,
        })

        if(newuser) {

            generateToken(newuser._id, res)
            await newuser.save()

            res.status(201).json({
                message: "success",
                userid: newuser._id,
                fullname: newuser.fullName,
                email: newuser.email,
                passowrd: newuser.password,
            })

        }else{
            res.status(400).json({message: "Error on creating user"})
        }

    } catch (error) {
        console.error("ERROR", error.message)
        res.status(500).json({message: "Server ERROR"})
    }
}

const Login = async (req, res) => {

    try {
        
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user || !password) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const isvalidPass = await bcrypt.compare(password, user.password)

        if(!isvalidPass) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        generateToken(user._id, res)

        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicL: user.profilePic,
            createdAt: user.createdAt,
        })
        
    } catch (error) {
        console.error("ERROR Login Controller:", error.message)
        res.status(500).json({message: "Internal ERRO"})
    }

}

const Logout = async (req, res) => {
    try {
        res.cookie("jwt", "",{maxAge: 0})
        return res.status(200).json({message: "Logout Successfuly"})
    } catch (error) {
        console.error("ERROR Logout:", error.message)
        return res.status(500).json({message: "Internal ERROR"})
    }
}

const CheckedAuth = (req, res) => {

    try {

        res.status(200).json(req.user)
        
    } catch (error) {
        console.error("ERROR CheckedAuth:", error.message)
        res.status(500).json({message: "Internal ERROR"})
    }
}

export {SignUp, Login, Logout, CheckedAuth}
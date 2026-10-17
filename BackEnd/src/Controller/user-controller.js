import User from "../Models/user.js";
import cloudinary from "../Utils/cloudinary.js";


const UpdateProfile = async (req, res) => {
    
    try {

        const {profilePic} = req.body
        const userid = req.user._id;

        if(!profilePic) {
           return res.status(400).json({message: 'Profile Picture is required to update'})
        }

        const uploadedres = await cloudinary.uploader.upload(profilePic)
        const updateduser = await User.findByIdAndUpdate(userid, {profilePic: uploadedres.secure_url}, {new: true})

        res.status(200).json(updateduser)
        
    } catch (error) {
        console.error('ERROR USER CONTROLLER:', error.message)
        res.status(500).json({message: "Internal ERRO"})
    }
}

export default UpdateProfile
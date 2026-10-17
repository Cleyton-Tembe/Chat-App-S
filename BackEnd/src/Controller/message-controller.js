import mongoose from "mongoose"
import Message from "../Models/message.js"
import User from "../Models/user.js"
import cloudinary from "../Utils/cloudinary.js"
import { getReceiversSocketsId, io } from "../Utils/sockes.js"


const getUsersOnSide = async (req, res) => {
    try {

        const loggedUserid = req.user._id

        const everyuser = await User.find({_id: {$ne: loggedUserid}}).select("-password")

        res.status(200).json(everyuser)
        
    } catch (error) {
        console.error("ERROR message-controller:", error.message)
        res.status(500).json({message: "Internal ERROR"})
    }
}

const getMessages = async (req, res) => {

    try {

        const id = req.params.id;
        const senderid = req.user._id;

        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json({messages: "Not a valid Id"})
        }

        const messages = await Message.find({
            $or:[

                {senderId:senderid, receiverId: id},
                {senderId: id, receiverId: senderid},

            ]
            
        }).sort({createdAt: 1})

        res.status(200).json(messages)
        
    } catch (error) {
        console.error("ERROR message-controller:", error.message)
        res.status(500).json({message: "Internal ERROR"})
    }
}

const PostMessage = async (req, res) => {

    try {

        const id = req.params.id
        const {text, image} = req.body
        const senderId = req.user._id

        if(image) {
            
            const upload = await cloudinary.uploader.upload(image)

            if(text) {

                const newMessage = new Message({
                senderId: senderId,
                receiverId: id,
                text: text,
                image: upload.secure_url,
                })

                await newMessage.save()
                const receiverSocketId = getReceiversSocketsId(id)
                if(receiverSocketId) {
                    io.to(receiverSocketId).emit("newMessage", newMessage)
                }
                return res.status(201).json(newMessage)



                
            }else{

                const newMessage = new Message({
                senderId: senderId,
                receiverId: id,
                image: upload.secure_url,
                })

                
                await newMessage.save()
                const receiverSocketId = getReceiversSocketsId(id)
                if(receiverSocketId) {
                    io.to(receiverSocketId).emit("newMessage", newMessage)
                }

                return res.status(201).json(newMessage)

            }


            
        }

        if(!text) return res.status(400).json({message: "Cannot send empty messages"})
        
        const newMessage = new Message({
            senderId: senderId,
            receiverId: id,
            text: text,
        })

        await newMessage.save()

        const receiverSocketId = getReceiversSocketsId(id)
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        
        res.status(201).json(newMessage)
        
    } catch (error) {
        console.error("ERROR message-controller:", error.message)
        res.status(500).json({message: "Internal ERROR"})
    }

}

export {getUsersOnSide, getMessages, PostMessage}
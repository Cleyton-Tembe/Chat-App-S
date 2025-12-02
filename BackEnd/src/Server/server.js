import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { ConnectDB } from '../Config/db.js'
import authRoute  from '../Routes/auth-route.js'
import userRoute from '../Routes/user-route.js'
import messgaRoute from '../Routes/message-route.js'
import { app, server} from '../Utils/sockes.js'

dotenv.config()

const port = process.env.PORT || 4000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,                
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/messages", messgaRoute)














server.listen(port, () => {
    ConnectDB()
    console.log(`Listening at http://localhost:${port}`)
})

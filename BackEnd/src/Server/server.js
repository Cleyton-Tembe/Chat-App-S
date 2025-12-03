import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import { ConnectDB } from '../Config/db.js'
import authRoute  from '../Routes/auth-route.js'
import userRoute from '../Routes/user-route.js'
import messgaRoute from '../Routes/message-route.js'
import { app, server} from '../Utils/sockes.js'

dotenv.config()

const port = process.env.PORT || 4000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

console.log(__dirname)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../../FrontEnd/dist")))

    console.log("Production Ready")

    app.get((req, res) => {
        res.sendFile(path.join(__dirname,"index.html"))
    })
    
}













server.listen(port, () => {
    ConnectDB()
    console.log(`Listening at http://localhost:${port}`)
})

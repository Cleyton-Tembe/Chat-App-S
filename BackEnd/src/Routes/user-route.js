import { Router } from 'express'
import UpdateProfile from '../Controller/user-controller.js'
import ProtectRoute from '../Middleware/auth-middleware.js'

const userRoute = Router()


userRoute.patch('/update-profile', ProtectRoute, UpdateProfile)


export default userRoute


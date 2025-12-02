import { Router } from "express";
import {CheckedAuth, Login, Logout, SignUp} from "../Controller/auth-controller.js";
import ProtectRoute from "../Middleware/auth-middleware.js";

const authRoute = Router()


authRoute.post("/signup", SignUp)

authRoute.post("/login", Login)

authRoute.post("/logout", Logout)

authRoute.get('/check', ProtectRoute, CheckedAuth)

export default authRoute
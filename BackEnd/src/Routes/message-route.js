import { Router } from "express";
import ProtectRoute from "../Middleware/auth-middleware.js";
import {getUsersOnSide, getMessages, PostMessage } from "../Controller/message-controller.js";

const messgaRoute = Router()

messgaRoute.get("/users", ProtectRoute, getUsersOnSide)

messgaRoute.get("/:id", ProtectRoute, getMessages)

messgaRoute.post("/send/:id", ProtectRoute, PostMessage)

export default messgaRoute
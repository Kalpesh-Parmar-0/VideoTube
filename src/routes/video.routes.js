import { Router } from "express";
import { varifyJWT } from "../middlewares/auth.middleware.js";
import { getAllVideos } from "../controllers/video.controller.js";

const router = Router()
router.use(varifyJWT) // app this middleware for all routes

router
.route("/")
.get(getAllVideos)
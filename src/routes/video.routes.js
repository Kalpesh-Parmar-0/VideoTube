import { Router } from "express";
import { varifyJWT } from "../middlewares/auth.middleware.js";
import { getAllVideos } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()
router.use(varifyJWT) // app this middleware for all routes

router
    .route("/")
    .get(getAllVideos)

    .post(
        varifyJWT,
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1
            },
            {
                name: "thumbnail",
                maxCount: 1
            }
        ]),
        publishAVideo
    )

export default router
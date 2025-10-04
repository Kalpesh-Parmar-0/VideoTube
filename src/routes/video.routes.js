import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    getAllVideos,
    publishAVideo,
    getVideoById,
    deleteVideo
} from "../controllers/video.controller.js";

const router = Router()
router.use(verifyJWT) // app this middleware for all routes

router
    .route("/")
    .get(getAllVideos)

    .post(
        verifyJWT,
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

router
    .route("/video/:videoId")
    .get(verifyJWT, getVideoById)
    .delete(verifyJWT, deleteVideo)

export default router
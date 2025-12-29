import {Router} from "express"
import {
    getLikedVideos,
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike
} from "../controllers/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT)

router.route("/toggle/videos/:videoId").post(toggleVideoLike)
router.route("/toggle/comment/:commentId").post(toggleCommentLike)
router.route("/toggle/tweet/:commentId").post(toggleTweetLike)
router.route("/videos").get(getLikedVideos)

export default router
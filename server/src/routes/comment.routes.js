import { Router } from "express";
import {
    getVideoComments,
    addComment,
    deleteComment,
    updateComment
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.use(verifyJWT, upload.none());

router.route("/:videoId").get(getVideoComments).post(addComment)

router.route("/channel/:commentId").delete(deleteComment).patch(updateComment)

export default router;
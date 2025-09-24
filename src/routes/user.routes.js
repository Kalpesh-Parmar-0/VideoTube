import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshBothToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { varifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)


router.route("/login").post(loginUser)

// secoured routes
router.route("/logout").post(varifyJWT, logoutUser)
router.route("/refresh-tokens").post(refreshBothToken)
router.route("/change-password").post(varifyJWT, changeCurrentPassword)
router.route("/current-user").get(varifyJWT, getCurrentUser)
router.route("/update-account").patch(varifyJWT, updateAccountDetails)

router.route("/avatar").patch(varifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(varifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/channel/:username").get(varifyJWT, getUserChannelProfile)
router.route("/watch-history").get(varifyJWT, getWatchHistory)

export default router
import mongoose, {isValidObjectId} from "mongoose";
import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllVideos = asyncHandler(async() => {

})

export {
    getAllVideos
}
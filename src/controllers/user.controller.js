import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken // adding refresh token in db
        await user.save({ validateBeforeSave: false }) // saving user without other fields like password

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "something went wrong while genereating access and refresh tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get uer details from frontend or db

    const { fullName, email, username, password } = req.body
    // console.log("email: ", email);

    // validation -- not empty

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are require")
    }

    // check if user already exist

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exist")
    }

    // check for images for avatar

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar required")
    }

    // upload them to cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar file required")
    }

    // create user object create enty on db

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })


    // remove password and refresh token field

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    // return res

    return res.status(201).json(
        new ApiResponse(201, createdUser, "user registred successfully")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    // get data from req.body

    const { email, username, password } = req.body


    // username or email

    if (!(username || email)) {
        throw new ApiError(400, "username or email required")
    }

    // find user

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    // check password

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(404, "Invalid user creadentials")
    }

    // access and refresh token

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    // send cookies

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    // find user
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User loged out"))
})

export { registerUser, loginUser, logoutUser }
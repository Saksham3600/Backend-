import { asyncHandler } from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'
import {uploadoncloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'


const registeruser = asyncHandler( async ( req,res) => {

    const { fullname, email, password ,username } = req.body
    console.log("email", email)

    if(
        [fullname,email,username,password].some((field) => field?.trim() === '')
      )
        {
            throw new ApiError(400, "all fields are required")
        }
        const existedUser = await User.findOne({
            $or: [{email},{username}]
        })
        if(existedUser){
            throw new ApiError(409, "email or username already exists")
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;

        if(!avatarLocalPath)
        {
            throw new ApiError(400, "avatar is required")
        
        }
        const avatar = await uploadoncloudinary(avatarLocalPath)
        const coverImage = await uploadoncloudinary(coverImageLocalPath)

        if(!avatar)
            {
                throw new ApiError(400, "avatar is required samajhe")
            
            }

            const user = awaitUser.create({
                fullname,
                avatar : avatar.url,
                coverImage : coverImage?.url||"",
                email,
                password,
                username: username.toLowerCase()
            })

            const createdUser  = await User.findById(user._id).select("-password -refreshToken") 


            if(!createdUser){
                throw new ApiError(500, "user not created")
            }

            return res.status(201).json(new ApiResponse(201, createdUser, "user created successfully"))
    }
) 



export {registeruser}
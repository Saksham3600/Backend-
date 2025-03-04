import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        avatar:{
            type: String, // cludinary service
            required: true
        },

        coverImage:{
            type: String, // cludinary service
        },

        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],

        password:{
            type: String,
            required : [true,'pass is required']
        },

        refreshtoken:{
            type : String
        }
        
    },
    { timestamps : true}
)


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

userSchema.methods.isPasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname
    },
    process.env.access_token_secret,
    {
        expiresin: process.env.access_token_expiry
    }
)
}

userSchema.methods.generaterefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
    process.env.refresh_token_secret,
    {
        expiresin: process.env.refresh_token_expiry
    }
)
}



export const User = mongoose.model("User", userSchema)
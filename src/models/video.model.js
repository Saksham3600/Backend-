import mongoose,{Schema} from "monoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema= new Schema(
    {
        videofile:{
            type: String, //cloudinary resource
            required :true
        },
        thumbnail:{
            type: String, //cloudinary resource
            required :true
        },
        title:{
            type: String,
            required :true
        },
        description:{
            type: String, 
            required :true
        },
        duration: {
            type: String,
            required :true
        },
        views:{
            type: Number,
            default :0
        },
        isPublished:{
            type: Boolean,
            default :false
        },
        owner: {
            type: Schema.types.objectid,
            ref: "User"
        }
    },
    { timestamp : true}
)

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema)

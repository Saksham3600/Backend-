import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({ 
    cloud_name: process.env.cloudinary_cloud_name, 
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_api_secret
});

const uploadoncloudinary = async (filepath) => {
    try {
        if(!filepath) return null;
        const response = await cloudinary.uploader.upload(filepath ,{
            resource_type: "auto",
        })
        console.log("file uploaded on cloudinary",response.url)
        return response;

    } catch (error) {
        fs.unlinkSync(filepath)
        return null;
    }
}



export {uploadoncloudinary}
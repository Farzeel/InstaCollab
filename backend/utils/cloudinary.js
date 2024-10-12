import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

  const fileUploadOnCloudonary  = async (localfilepath)=>{

try {
  console.log({localfilepath})
        if (!localfilepath) return null
    
       const result = await cloudinary.uploader.upload(localfilepath, {
          resource_type:"auto" ,
          folder: "InstaBlogs"
          
        });
      
    
        // DELETE THE FILE FROM LOCAL SYSTEM
        fs.unlink(localfilepath, (err) => {
          if (err) {
            console.error('Error deleting local file in catch:', err);
          }
        })
    
        return result
} catch (error) {
    console.log({cloudinary:error})
    fs.unlink(localfilepath, (err) => {
      if (err) {
        console.error('Error deleting local file in catch:', err);
      }
    })
    return null
}

}

export {fileUploadOnCloudonary}


import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setProgressState, setUploadState } from "../../store/postSlice";
import { toast } from "@/hooks/use-toast";

const url = "http://localhost:8000/api/v1/posts";



const useUpload = () => {
  const dispatch = useDispatch();
  


const createPost = async (media, caption, location) => {
  try {
    
    console.log("media", media, caption, location);
    const formData = new FormData();
    
    // Append media files to formData
    media.forEach((file) => {
      formData.append("userPosts", file);
    });
    
    // Append other fields to formData
    if (caption) formData.append("caption", caption);
    if (location) formData.append("location", location);

    

    dispatch(setUploadState({ postUploading: true }));
    
    // Track the upload progress
    
    const response = await axios.post(`${url}/createPost`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      onUploadProgress: (progressEvent) => {
        let percentComplete = Math.floor((progressEvent.loaded  / progressEvent.total) * 100 );
        let filetotal = Math.floor(progressEvent.total/1000)
        console.log(percentComplete , filetotal)
        dispatch(setProgressState({ progress: percentComplete }));
      },
    });
   
  

    // Only show the toast and stop uploading after the server finishes processing the upload
    toast({ description: response.data.message });

  } catch (error) {
    dispatch(setUploadState({ postUploading: false }));
    console.error(
      "Error:",
      error.response ? error.response.data.message : error.message
    );
    toast({
      description: error.response
        ? error.response.data.message
        : "An error occurred",
    });
  } finally {
    // Ensure progress is only set to 0 after the server completes processing
    setTimeout(() => {
      dispatch(setUploadState({ postUploading: false }));
      dispatch(setProgressState({ progress: 0 }));
    }, 500);
  }
};
return { createPost };

};

export default useUpload;

export const getFeed =async (pageNumber)=>{
  try {
    const response = await axios.get(`${url}/homeFeed?page=${pageNumber}&limit=10`,  {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      
    });
    return response.data
  } catch (error) {
    console.log(error)
  }
}

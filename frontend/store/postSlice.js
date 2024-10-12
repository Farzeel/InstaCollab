// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  posts:[],  
  progress: 0,
  postUploading: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setposts: (state, action) => {
      state.posts = action.payload.posts;

    },
    setProgressState:(state,action)=>{
      
        state.progress = action.payload.progress;
    },
    setUploadState:(state,action)=>{
        state.postUploading = action.payload.postUploading;
    },
    resetPosts:(state)=>{
        state.posts = [];
        state.postUploading = false;
        state.progress = 0;
    }
 
  },
});

export const { setposts,resetPosts,setProgressState,setUploadState } = postSlice.actions;
export default postSlice.reducer;



import React, { useState, useEffect, useContext } from 'react';
import PostFeed from './PostFeed'
import StorySection from './Stories'
import SuggestedUser from './SuggestedUser'
import { Outlet } from 'react-router-dom';
import CreatePost from './CreatePost';
import GlobalContext from '../context/context';

const Home = () => {
  const { postDialog, setPostDialog  } = useContext(GlobalContext)

  return (
    < >
     { postDialog && <CreatePost/>}
      <StorySection />
      <PostFeed />
      <Outlet/>
    

  </>

  )
}
export default Home

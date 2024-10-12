import { Children, useEffect, useState } from 'react'
import Home from './components/Home'
import Sidebar from './components/LeftSideBar'
import TopBar from './components/TopBar'
import SignInPage from './components/SignIn'
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom"
import ProtectedRoutes from './components/protectedRoutes'
import ProfilePage from './components/ProfilePage'
import SignupPage from './components/SignUp'
import Layout from './components/Layout'

import CreatePost from './components/CreatePost'





function App() {

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element:<ProtectedRoutes><Layout/></ProtectedRoutes>,
      children:[
        {
        path:"/",
        element:<ProtectedRoutes> <Home/> </ProtectedRoutes>,
        },
        {
          path: '/profile/:id',
          element: <ProtectedRoutes> <ProfilePage /></ProtectedRoutes>
        },

      ],
    },

    {
      path:"/login",
      element:<SignInPage/>

    },
    {
      path:"/signup",
      element:<SignupPage/>

    },

  ])


  return (
<>   <RouterProvider router={browserRouter} />  </>
  )
  


  
}

export default App

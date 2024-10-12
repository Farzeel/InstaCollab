
import LeftSidebar from "./LeftSideBar"
import { Outlet } from 'react-router-dom'
import StickyProgressBar from "./ProgressBar"
import { useSelector } from "react-redux"
import { Toaster } from "./ui/toaster"





const Layout = () => {
  const {postUploading,progress} = useSelector(store=>store.post)
  return (
     
     <>
     <LeftSidebar/>
     <Toaster />
     {postUploading && <StickyProgressBar progress={progress}/>}
       <Outlet/>
     </>
  )
}

export default Layout

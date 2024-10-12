import React, { useContext, useEffect, useState } from 'react';
import { FaHome, FaSearch, FaFilm, FaBell, FaUser, FaEnvelope } from 'react-icons/fa';
import { LuPlusSquare } from "react-icons/lu"
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../APIs/users/user';
import GlobalContext from '../context/context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';



const Sidebar = () => {
  
  const [activeIcon, setActiveIcon] = useState('home');
  const {  setPostDialog  } = useContext(GlobalContext)
  
  const dispatch  =useDispatch()
  const navigate  =useNavigate()
  const {user} = useSelector(store=>store.auth)



  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout =async ()=>{
    try {
      const data = await logout()
      if(data.success){
        dispatch(setAuthUser({user:null, isAuthenticated:data.isLoggedIn}))
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }

  }

  const menuItems = [
    { id: 'home', icon: FaHome, label: 'Home' },
    { id: 'search', icon: FaSearch, label: 'Search' },
    { id: 'reels', icon: FaFilm, label: 'Reels' },
    { id: 'messages', icon: FaEnvelope, label: 'Messages' },
    { id: 'notifications', icon: FaBell, label: 'Notifications' },
    { id: 'createPost', icon: LuPlusSquare, label: 'Create' },
    { id: 'profile', icon: FaUser, label: 'Profile' },
  ];

  const handleIconClick = (id) => {
    setActiveIcon(id);
    if(id=="createPost") setActiveIcon("home")
    // Add navigation logic here
     if(id =="createPost"){
      setPostDialog(true)
     }
  };

    const fullName = user?.fullName || "Default Name";
    const nameParts = fullName.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('').toUpperCase().slice(0,2) 



  return (
    <aside className={`fixed md:left-0 md:h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
                    md:w-64 ${dimensions.width<1150&&"md:w-36"} w-full md:top-0 bottom-0 flex md:flex-col justify-between py-4
                    md:border-r-2 md:border-t-0 border-t-2`}>
       {/* For Large DEVICES */}                 
{    dimensions.width>1150 && <div className="md:block hidden">
        <div className="px-4 py-2 mb-6">
          <h1 className="text-xl font-bold">Instagram</h1>
        </div>
        <nav>
          <ul className='space-y-7'>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => handleIconClick(item.id)}
                  className={`flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500  transition-all duration-200 ${activeIcon === item.id ? 'text-blue-500' : ''}`}
                  aria-label={item.label}
                >
                 {item.icon==FaUser?<><Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePhoto.imageLink} alt="@shadcn" />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar></>
                 :
                 <item.icon className={`w-6 h-6 ${activeIcon === item.id ? 'transform scale-110 text-blue-500' : ''}`} />}
                  <span className={`ml-4 inline ${activeIcon === item.id ? 'font-bold text-blue-500' : ''}`}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>}

{/* For MEDIUM DEVICES */}
{    dimensions.width<1150&&  <div className="md:block hidden">
        <div className="px-4 py-2 mb-6">
          <h1 className="text-xl font-bold">Instagram</h1>
        </div>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => handleIconClick(item.id)}
                  className={`flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ${activeIcon === item.id ? 'text-blue-500' : ''}`}
                  aria-label={item.label}
                >
                  <item.icon className={`w-6 h-6 ${activeIcon === item.id ? 'transform scale-110' : ''}`} />
                  {/* <span className="ml-4 inline">{item.label}</span> */}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>}

 {/* For Small DEVICES */}
      <div className="md:hidden flex justify-around w-full">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleIconClick(item.id)}
            className={`flex flex-col items-center px-2 py-1 text-gray-700 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ${activeIcon === item.id ? 'text-blue-500' : ''}`}
            aria-label={item.label}
          >
            <item.icon className={`w-6 h-6 ${activeIcon === item.id ? 'transform scale-110' : ''}`} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="px-4 md:block hidden">
        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200">
          <FaUser className="w-6 h-6" />
          <span className="ml-4 inline">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

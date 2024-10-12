import React, { useState } from 'react';
import { FaUserFriends, FaUsers, FaHeart, FaComment, FaEdit } from 'react-icons/fa';
import { RiVideoLine, RiBookmarkLine, RiPriceTag3Line } from 'react-icons/ri';
import { BsGrid3X3 } from 'react-icons/bs';

const ProfilePage = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  const posts = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', likes: 120, comments: 15 },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61', likes: 89, comments: 7 },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1502378735452-bc7d86632805', likes: 230, comments: 22 },
    { id: 4, imageUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43', likes: 156, comments: 18 },
    { id: 5, imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde', likes: 98, comments: 11 },
    { id: 6, imageUrl: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6', likes: 178, comments: 20 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          alt="Profile Picture"
          className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-gray-300 mb-4 md:mb-0 md:mr-8"
        />
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bold mb-2">Jane Doe</h1>
          <p className="text-gray-600 text-center md:text-left mb-4 max-w-md">
            Passionate photographer and digital artist. Exploring the world one click at a time.
            Love to capture moments and create memories.
          </p>
          <div className="flex space-x-8 mb-4">
            <div className="flex items-center">
              <FaUserFriends className="mr-2" />
              <span className="font-semibold">1.5k</span> <span className="text-gray-600 ml-1">Followers</span>
            </div>
            <div className="flex items-center">
              <FaUsers className="mr-2" />
              <span className="font-semibold">500</span> <span className="text-gray-600 ml-1">Following</span>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        </div>
      </div>

      <hr className="mb-6 border-gray-300" />

      <div className="flex justify-center mb-8">
        <nav className="flex space-x-4 md:space-x-8">
          <a href="#" className="flex items-center text-blue-500 border-b-2 border-blue-500 pb-1">
            <BsGrid3X3 className="mr-2" /> Posts
          </a>
          <a href="#" className="flex items-center text-gray-500 hover:text-blue-500">
            <RiVideoLine className="mr-2" /> Reels
          </a>
          <a href="#" className="flex items-center text-gray-500 hover:text-blue-500">
            <RiBookmarkLine className="mr-2" /> Saved
          </a>
          <a href="#" className="flex items-center text-gray-500 hover:text-blue-500">
            <RiPriceTag3Line className="mr-2" /> Tagged
          </a>
        </nav>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="aspect-w-1 aspect-h-1 relative"
            onMouseEnter={() => setHoveredPost(post.id)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            <img
              src={post.imageUrl}
              alt={`Post ${post.id}`}
              className="object-cover w-full h-full rounded-lg"
            />
            {hoveredPost === post.id && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4">
                <button className="text-white flex items-center">
                  <FaHeart className="mr-2" /> {post.likes}
                </button>
                <button className="text-white flex items-center">
                  <FaComment className="mr-2" /> {post.comments}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
import { getFeed } from '../../APIs/posts/postsApis';
import React, { useState, useEffect } from 'react';
import { FaHeart, FaComment, FaPaperPlane, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MySwiperComponent from './MySwiperComponent';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // const fetchPosts = async () => {
    //   setLoading(true);
    //   const mockPosts = [
    //     {
    //       id: 1,
    //       author: {
    //         name: 'John Doe',
    //         profilePic: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
    //       },
    //       imageUrl: 'https://images.unsplash.com/photo-1682687220305-ce8a9ab237b1',
    //       caption: 'Beautiful sunset at the beach',
    //       likes: 120,
    //       comments: 15,
    //       bookmarked: false
    //     },
    //     {
    //       id: 2,
    //       author: {
    //         name: 'Jane Smith',
    //         profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    //       },
    //       imageUrl: 'https://images.unsplash.com/photo-1682687220509-61b8a906f5b7',
    //       caption: 'Exploring the mountains',
    //       likes: 85,
    //       comments: 8,
    //       bookmarked: true
    //     },
    //     {
    //       id: 3,
    //       author: {
    //         name: 'Mike Johnson',
    //         profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    //       },
    //       imageUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    //       caption: 'City lights at night',
    //       likes: 200,
    //       comments: 25,
    //       bookmarked: false
    //     },
    //   ];
    //   setPosts(mockPosts);
    //   setLoading(false);
    // };

    // fetchPosts();
     const fetchposts=async()=>{

       const data = await getFeed(page)
       console.log(data)
       setPosts(data.posts)
     }
     fetchposts()
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
    ));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto md:flex md:justify-center px-4 py-8 ">
     
      <div className="space-y-8 md:w-1/3">
        {posts.map((post) => (
          <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4  flex items-center space-x-3">
              <img 
              
                src={post.user.profilePhoto.imageLink} 
                alt={post.user.username}
                className="w-10 h-10 rounded-full object-cover aspect-square"
              />
              <span className="font-semibold">{post.user.username}</span>
            </div>
         <MySwiperComponent post={post}/>
            
            
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleLike(post._id)}
                    className="text-2xl hover:text-red-500 transition-colors duration-200"
                    aria-label="Like post"
                  >
                    <FaHeart fill='black' />
                  </button>
                  <button className="text-2xl hover:text-blue-500 transition-colors duration-200">
                    <FaComment />
                  </button>
                  <button className="text-2xl hover:text-green-500 transition-colors duration-200">
                    <FaPaperPlane />
                  </button>
                </div>
                <button 
                  onClick={() => handleBookmark(post._id)}
                  className="text-2xl hover:text-yellow-500 transition-colors duration-200"
                >
                  {post.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>
              <p className="font-bold">{post.likes.length} likes</p>
              <p className="text-gray-800">{post.caption}</p>
              <button className="text-gray-500 hover:text-gray-700">View all {post.comments.length} comments</button>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="flex-grow p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="text-blue-500 font-semibold">Post</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
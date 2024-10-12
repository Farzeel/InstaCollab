import React from 'react';
import { FaUser, FaEllipsisH } from 'react-icons/fa';

const SuggestedUser = () => {
  const suggestedUsers = [
    { id: 1, name: 'John Doe', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
    { id: 2, name: 'Jane Smith', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
    { id: 3, name: 'Mike Johnson', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
          <FaUser className="text-gray-600 text-xl" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Your Profile</h2>
          <p className="text-sm text-gray-600">@username</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Suggested For You</h3>
          <button className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
            See All
          </button>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-700">Discover new content and users tailored for you!</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Suggested Users</h3>
        <ul>
          {suggestedUsers.map((user) => (
            <li key={user.id} className="flex items-center justify-between mb-4 last:mb-0">
              <div className="flex items-center">
                <img
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <span className="font-medium">{user.name}</span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full transition-colors duration-200 flex items-center justify-center">
        <FaEllipsisH className="mr-2" />
        <span>More Options</span>
      </button>
    </div>
  );
};

export default SuggestedUser;
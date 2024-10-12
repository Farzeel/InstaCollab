import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const TopBar = () => {
  const [activeTab, setActiveTab] = useState('for you');

  return (
    <div className="w-full md:w-[46%] md:m-auto border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            <button
              className={`py-4 text-lg font-medium   ${
                activeTab === 'for you'
                  ? 'text-black border-b-2 border-blue-500'
                  : 'text-[#c7c7c7] '
              }`}
              onClick={() => setActiveTab('for you')}
            >
              For you
            </button>
            <button
              className={`py-4 text-lg  font-medium text-[#c7c7c7] ${
                activeTab === 'following'
                  ?'text-black border-b-2 border-blue-500'
                  : 'text-[#c7c7c7] '
                
              }`}
              onClick={() => setActiveTab('following')}
            >
              Following
            </button>
          </div>
    
        </div>
      </div>
    </div>
  );
};

export default TopBar;
import React, { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const url = "https://images.unsplash.com/photo-1726688837477-c8cbcab8e05a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"

const stories = [
  { id: 1, image: url, alt: 'Cat story', title: 'Fluffy Adventures' },
  { id: 2, image: url, alt: 'Dog story', title: 'Puppy Tales' },
  { id: 3, image: url, alt: 'Travel story', title: 'Wanderlust' },
  { id: 4, image: url, alt: 'Food story', title: 'Culinary Delights' },
  { id: 5, image: url, alt: 'Nature story', title: 'Eco Explorers' },
  { id: 6, image: url, alt: 'Tech story', title: 'Future Tech' },
  { id: 7, image: url, alt: 'Music story', title: 'Melodic Moments' },
  { id: 8, image: url, alt: 'Art story', title: 'Creative Canvas' },
];

const StorySection = () => {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      console.log(`Navigating to story ${id}`);
    }
  };

  return (
    <div className="md:w-[45%] md:m-auto relative bg-gradient-to-r from-black-500 to-white-500 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
       
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide md:space-x-4  space-x-3   "
          >
            {stories.map((story) => (
              <div
                key={story.id}
                className=" focus:outline-none"
                tabIndex={0}
                role="button"
                onClick={() => console.log(`Navigating to story ${story.id}`)}
                onKeyDown={(e) => handleKeyDown(e, story.id)}
              >
                <div className={`w-20  h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-white hover:ring-4 transition-all duration-300 focus:ring-4 cursor-pointer`}>
                  <img
                    src={story.image}
                    alt={story.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
            <p className="text-black mt-2 text-sm">{story.title.length <= 10 ? story.title : `${story.title.slice(0, 10)}...`}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50  rounded-full p-2  transition-all duration-300"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-purple-700" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50  rounded-full p-2  transition-all duration-300"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-purple-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
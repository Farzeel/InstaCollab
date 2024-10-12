import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MySwiperComponent = ({ post }) => {
  const videoRefs = useRef([]);

  useEffect(() => {
    console.log("swiper use effect")
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5 // Adjust threshold as needed
    });

    videoRefs.current.forEach(video => {
      if (video) {
        observer.observe(video);
        video.addEventListener('ended', () => video.play()); // Replay on end
        video.addEventListener('click', () => { 
          if (video.paused) {
            video.play();
            
          } else {
            video.pause();
           
          }
        });
      }
    });
    const handleVisibilityChange = () => {
        console.log("Visibility changed:", document.hidden);
        if (document.hidden) {
          videoRefs.current.forEach(video => {
            if (video) {
              video.pause();
            }
          });
        }else {
            videoRefs.current.forEach(video => {
              if (video) {
                video.play();
              }
            });
          }
      };
      const handleFocus = () => {
        console.log("Window focus regained");
        videoRefs.current.forEach(video => {
          if (document.interacted && video && video.intersecting) {
            video.play().catch((err) => console.error("Autoplay prevented:", err));
          }
        });
      };
  
      window.addEventListener('focus', handleFocus);
  
      document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      videoRefs.current.forEach(video => {
        if (video) {
          video.removeEventListener('ended', () => video.play());
          video.removeEventListener('click', () => {
            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
          });
        }
      });
    };
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-full rounded-lg overflow-hidden shadow-lg"
    >
      {post.media.map((media, index) => (
        <SwiperSlide onClick={() => console.log(media._id)} key={media._id}>
          {media.mediaType === "image" ? (
            <img 
              src={media.mediaLink} 
              alt={post.caption}
              className="w-full h-96 object-cover"
            />
          ) : (
            <video 
              ref={el => videoRefs.current[index] = el} 
              src={media.mediaLink} 
              class="w-full h-auto max-w-full mx-auto rounded-lg aspect-w-16 aspect-h-9 object-fit-cover shadow-md border-2 border-gray-300" 
              muted={false}
              
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySwiperComponent;

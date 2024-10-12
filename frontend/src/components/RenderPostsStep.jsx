import React, { useContext, useState } from "react";
import {  FiArrowLeft, FiMapPin, FiX, FiArrowRight } from "react-icons/fi";
import { MdPhotoLibrary } from "react-icons/md";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useUpload from "../../APIs/posts/postsApis";
import GlobalContext from "@/context/context";
// import { createPost } from "../../APIs/posts/postsApis";

const MediaPreview = React.memo(({media, handleDeleteMedia }) => (
  <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={30}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    className="w-full h-full rounded-lg overflow-hidden shadow-lg"
  >
    {media.map((file, index) => (
      <SwiperSlide key={index}>
        <div className="w-full h-full flex items-center justify-center bg-white relative">
          {file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <video
              src={URL.createObjectURL(file)}
              controls
              className="max-w-full max-h-full"
            />
          )}
          <button
            onClick={() => handleDeleteMedia(index)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
            aria-label="Delete media"
          >
            <FiX className="text-xl" />
          </button>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
));



  const renderStep = () => {
      
     
      const [step, setStep] = useState(1);
      const [media, setMedia] = useState([]);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");

    const {createPost} = useUpload()
    const {  setPostDialog  } = useContext(GlobalContext)



  


    const handleNext = () => {
        setStep(step + 1);
      };
    
      const handleBack = () => {
        setStep(step - 1);
      };
    
      const handleShare = async() => {
       
 
        setPostDialog(false)
       await createPost(media,caption,location)
  
       
      };
    
      const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setMedia([...media, ...files]);
        setStep(step + 1)
      };
    
      const handleDragDrop = (event) => {
        event.preventDefault();
        console.log("drp", step)
        const files = Array.from(event.dataTransfer.files);
        setMedia([...media, ...files]);
        setStep(step + 1)
      };
    
      const handleDeleteMedia = (index) => {
        const updatedMedia = [...media];
        updatedMedia.splice(index, 1);
        setMedia(updatedMedia);
      };

      
      
    


    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full"
          >
            <div
              className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center "
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDragDrop}
            >
              <MdPhotoLibrary className="text-6xl text-gray-400 mb-4" />
              <span className="text-gray-500 mb-4">Drag photos or videos here</span>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileUpload}
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
              >
                Upload from computer
              </label>
            </div>
            {media.length > 0 && (
              <button
                onClick={handleNext}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Next
              </button>
            )}
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col h-full"
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800"
                aria-label="Go back"
              >
                <FiArrowLeft className="text-2xl" />
              </button>
              <h2 className="text-xl font-semibold">Preview</h2>
              <button
                onClick={handleNext}
                className="px-4 py-2  text-black font-medium rounded-md  transition duration-300"
              >
                Next
              </button>
            </div>
            <MediaPreview media={media} handleDeleteMedia={handleDeleteMedia} />
       
          </motion.div>
        );
      case 3:
        return (
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col h-full"
          >
           
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800"
                aria-label="Go back"
              >
                <FiArrowLeft className="text-2xl" />
              </button>
              <h2 className="text-xl font-semibold">Finalize Post</h2>
              <button
                onClick={handleShare}
                className="text-blue-500 hover:text-blue-600 transition duration-300 flex items-center"
                aria-label="Share post"
              >
                <span className="mr-2">Share</span>
                <FiArrowRight className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-col md:flex-row h-full bg-gray-100 rounded-lg p-6">
              <div className="md:w-1/2 p-4">
                <MediaPreview media={media} handleDeleteMedia={handleDeleteMedia}/>
                {/* <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  className="w-full h-full rounded-lg overflow-hidden shadow-lg"
                >
                  {media.map((file, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full flex items-center justify-center bg-black relative">
                        {file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <video
                            src={URL.createObjectURL(file)}
                            controls
                            className="max-w-full max-h-full"
                          />
                        )}
                        <button
                          onClick={() => handleDeleteMedia(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                          aria-label="Delete media"
                        >
                          <FiX className="text-xl" />
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper> */}
              </div>
              <div className="md:w-1/2 p-4 flex flex-col">
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-md resize-none mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Caption"
                />
                <div className="relative mb-4">
                  <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add location"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Location"
                  />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Post Summary</h3>
                  <p><strong>Media:</strong> {media.length} file(s)</p>
                  <p><strong>Caption length:</strong> {caption.length} characters</p>
                  <p><strong>Location:</strong> {location || "Not specified"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  
  export default renderStep
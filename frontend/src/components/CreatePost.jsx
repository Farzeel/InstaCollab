import React, { useContext } from "react";

import { AnimatePresence } from "framer-motion";

import GlobalContext from "../context/context";
import renderStep from "./RenderPostsStep";

const createPost = () => {
  const { setPostDialog } = useContext(GlobalContext);

  const handleDialogBox = () => {
    setPostDialog(false);
  };

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white  rounded-lg shadow-xl w-full max-w-2xl h-[80vh] overflow-hidden relative">
        <button
          onClick={handleDialogBox}
          className="absolute cursor-pointer z-10 font-medium text-red-600 bottom-2 w-8 right-5   hover:text-gray-700 transition duration-300"
          aria-label="Close dialog"
        >
          Close
        </button>
        <div className="p-4 h-full">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default createPost;

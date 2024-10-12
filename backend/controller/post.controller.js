import mongoose from "mongoose";
import {Post} from "../models/post.model.js"
import { fileUploadOnCloudonary } from "../utils/cloudinary.js"; 
import {v2 as cloudinary} from "cloudinary"
import { User } from "../models/user.model.js";


// Create a new post
export const createPost = async (req, res) => {

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { caption, location, isPublic } = req.body;
    const files = req.files; 
    const userId = req.userId;
    
    // Validate file existence
    if (!files || !files.length ) {
      return res.status(400).json({ message: "At least one image or video is required.", success: false });
    }
    console.log(files)
    if(files.length >10)  {

      return res.status(400).json({ message: "maximun 10 files can uploaded .", success: false });
    }

   
    const mediaArray = await Promise.all(
      files.map(async (file) => {
        const uploadedMedia = await fileUploadOnCloudonary(file.path);
      
        return uploadedMedia
          ? {
              mediaType: file.mimetype.startsWith("image/") ? "image" : "video",
              publicId: uploadedMedia.public_id,
              mediaLink: uploadedMedia.secure_url,
            }
          : null;
      })
    );

  
    // Filter out any failed uploads
    const validMedia = mediaArray.filter((media) => media !== null);

    if (!validMedia.length) {
      return res.status(500).json({ message: "Failed to upload media files.", success: false });
    }

    // Create a new post
    const newPost = new Post({
      user: userId,
      caption,
      media: validMedia,
      location,
      isPublic ,
    });

    await newPost.save();

    const postCreatedBy = await User.findById(userId).session(session);
    if (postCreatedBy) {
      postCreatedBy.posts.push(newPost._id);
      await postCreatedBy.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Post created successfully", success: true, post: newPost });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error. Failed to create post.", success: false });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    // Find the post by ID and ensure the user is the owner
    const post = await Post.findById(postId);
    if (!post || post.user.toString() !== userId) {
      return res.status(404).json({ message: "Post not found or you're not authorized.", success: false });
    }

    // Delete associated media from Cloudinary
    for (const media of post.media) {
      if (media.publicId) {
        await cloudinary.uploader.destroy(media.publicId, { resource_type: media.mediaType === "video" ? "video" : "image" });
      }
    }
 

    // Remove the post from the database
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error. Failed to delete post.", success: false });
  }
};

// EditPost
export const editPost = async (req, res) => {
  try {
    const { caption, location, isPublic } = req.body;
    const postId = req.params.id;
    const userId = req.userId;

    // Find the post by ID and ensure the user is the owner
    const post = await Post.findById(postId);
    if (!post || post.user.toString() !== userId) {
      return res.status(404).json({
        message: "Post not found or you're not authorized to edit this post.",
        success: false,
      });
    }

    // Update only the allowed fields: caption, location, and isPublic
    if (caption) post.caption = caption;
    if (location) post.location = location;
    if (isPublic ) post.isPublic = isPublic;

    // Save the updated post
    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).json({
      message: "Server error. Failed to update post.",
      success: false,
    });
  }
};




// Delete a specific post by ID
export const deleteSpecificPost = async (req, res) => {
  try {
    const { postId } = req.params; // Get post ID from request parameters
    const userId = req.userId; // Get user ID from authenticated user

    // Find the post by ID and ensure the user is the owner
    const post = await Post.findById(postId);
    if (!post || post.user.toString() !== userId) {
      return res.status(404).json({
        message: "Post not found or you're not authorized to delete this post.",
        success: false,
      });
    }

    // Delete associated media from Cloudinary
    for (const media of post.media) {
      if (media.publicId) {
        await cloudinary.uploader.destroy(media.publicId, {
          resource_type: media.mediaType === "video" ? "video" : "image",
        });
      }
    }

    // Remove the post from the database
    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting specific post:", error);
    res.status(500).json({
      message: "Server error. Failed to delete post.",
      success: false,
    });
  }
};




// Like a post
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found", message:false });
    }

    // Check if user already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "You have already liked this post", message:false });
    }

    // Add user ID to the likes array
    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Post liked", likes: post.likes.length , message:true});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found", message:false });
    }

    // Check if the user has liked the post
    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "You have not liked this post", message:false });
    }

    // Remove user ID from the likes array
    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    await post.save();

    res.status(200).json({ message: "Post unliked", likes: post.likes.length, message:true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




export const getHomeFeed = async (req, res) => {
  try {
    const userId = req.userId; // Current logged-in user's ID
    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    // Fetch the current user's "following" list
    const user = await User.findById(userId).select('following');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find posts from the users that the current user is following
    const posts = await Post.find({ user: { $in: user.following } })
      .sort({ createdAt: -1 }) // Newest posts first
      .skip((page - 1) * limit) // Pagination logic
      .limit(Number(limit))
      .populate('user', 'username profilePhoto') // Populate user details (e.g., username, profile photo)
      .exec();

    // Return the paginated posts
    res.status(200).json({
      posts,
      currentPage: Number(page),
      postsPerPage: Number(limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// models/User.js
import mongoose from "mongoose";

// Create the User schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
    },
    websiteLink: {
      type: String,
      default: "",
    },
    profilePhoto: {
      publicId: {
        type: String,
        default: "",
      },
      imageLink: {
        type: String,
        default: "",
      }
    },
    
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    birthdate: {
      type: String,
      required: true,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    savePosts : [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt timestamps
  }
);

// Create and export the User model
export const User = mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 2200, 
      default:""
    },
    media: [
        {
          mediaType: {
            type: String,
            enum: ["image", "video"],
            required: true, 
          },
          publicId: {
            type: String, 
            required: true,
          },
          mediaLink: {
            type: String, 
            required: true,
          },
        },
      ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      },
    ],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"},
    ],
    location: {
      type: String,
      default: "",
    },
    isPublic: {
      type: Boolean, 
      default: true,
    },
    
  },
  {
    timestamps: true, 
  }
);

// Create and export the Post model
export const Post = mongoose.model("Post", PostSchema);

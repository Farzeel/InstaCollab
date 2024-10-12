import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema();

// Create and export the Post model
export const Comment = mongoose.model("Comment", CommentSchema);

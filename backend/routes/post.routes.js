import {Router} from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { createPost, deletePost, deleteSpecificPost, editPost, getHomeFeed, likePost, unlikePost } from "../controller/post.controller.js"

const route = Router()

route.route("/createPost",).post(isAuthenticated , upload.array('userPosts'),  createPost)
route.route("/deletePost/:id",).delete(isAuthenticated ,  deletePost)
route.route("/deleteSinglePost/:id",).delete(isAuthenticated ,  deleteSpecificPost)
route.route("/editPost/:id",).put(isAuthenticated , editPost)

route.route("/likePost/:id").put(isAuthenticated, likePost);
route.route("/unlikePost/:id").put(isAuthenticated, unlikePost);
route.route("/homeFeed").get(isAuthenticated, getHomeFeed);






export default route
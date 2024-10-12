import { Router } from "express";
import {
  checkTokenExpired,
  editProfile,
  followUser,
  getAdvancedSuggestedUsers,
  getProfile,
  getSuggestedUsers,
  loginUser,
  logoutUser,
  registerUser,
  searchUsers,
  unfollowUser,
} from "../controller/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const route = Router();

route.route("/register").post(registerUser);
route.route("/login").post(loginUser);
route.route("/logout").post(logoutUser);
route.route("/checkToken").get(checkTokenExpired);
route.route("/profile/:id").get(getProfile);
route .route("/editProfile") .put(isAuthenticated, upload.single("avatar"), editProfile);
route.route("/searchUsers").get(searchUsers);
route.route("/follow/:id").put(isAuthenticated, followUser);
route.route("/unfollow/:id").put(isAuthenticated, unfollowUser);
route.route("/suggestedUsers").get(isAuthenticated, getSuggestedUsers);
route.route("/advancedSuggestedUsers").get(isAuthenticated, getAdvancedSuggestedUsers);

export default route;

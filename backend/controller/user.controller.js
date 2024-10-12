import { User } from "../models/user.model.js";
import {v2 as cloudinary} from 'cloudinary';
import { profileEditSchema } from "../schemas/editProfile.schema.js";
import { loginValidationSchema } from "../schemas/logIn.schema.js";
import { signupValidationSchema } from "../schemas/signUp.schema.js";
import { fileUploadOnCloudonary } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";


const COOKIE_EXPIRY = 1 * 24 * 60 * 60 * 1000; 

// REGISTER cONTROLLER
export const registerUser = async (req,res)=>{
   
  let { username, email, password, fullName,  gender, birthYear, birthDay, birthMonth } = req.body;
  // Validate request body with Joi
  const { error } = signupValidationSchema.validate({username,email,password,fullName,gender, birthYear, birthDay, birthMonth});
  if (error) {
    return res.status(400).json({success:false, message: error.details[0].message });
  }
  

  try {
    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists', success:false });
    }
    
 let noSpacesUsernameStr = username.replace(/\s+/g, '');
 let ExtraSpacesFullNameStr = fullName.trim().replace(/\s+/g, ' ');
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    if(birthDay <10){
      birthDay = `${0}${birthDay}`
    }
    if(birthMonth <10){
      birthMonth = `${0}${birthMonth}`
    }

    let birthdate = `${birthMonth}-${birthDay}-${birthYear}`

    // Create a new user
    const newUser = new User({
      username:`@${noSpacesUsernameStr}`,
      email,
      password: hashedPassword,
      fullName:ExtraSpacesFullNameStr,
      gender,
      birthdate
    });

    // Save the user in the database
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      success:true,
      newUser:newUser.email
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message, success:false });
  }

}

// Login Controller
export const loginUser = async (req, res) => {
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message, success:false });
    }
  
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' , success:false});
      }
  
      // const isMatch = await bcrypt.compare(password, user.password);
      if (password !=user.password) {
        return res.status(400).json({ message: 'Invalid email or password', success:false });
      }
  
      const userInfo = await User.findById(user._id).select("-password")
      if (!userInfo) {
          return res.status(500).json({message:"SomeThing went wrong while logging in the user please try again after few seconds", success:false})
      }
  
      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
       
      res.cookie('token', token, {
          httpOnly: true,
          sameSite: 'Strict',
          maxAge: COOKIE_EXPIRY,
        });
  
      res.status(200).json({
        message: 'Login successful',
        success:true,
        isLoggedIn:true,
        userInfo
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  };
export const checkTokenExpired = async (req,res)=>{
  const token = req.cookies.token;
  if (!token) {
      return res.status(401).json({ message: 'No token found' });
  }
  try {
      await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json({ valid: true });
  } catch (err) {
      return res.status(401).json({ message: 'Token expired or invalid' });
  }
}




//   LOGOUT CONTROLLER

export const logoutUser = async (_, res) => {
    try {
        return res.status(200).clearCookie("token", { httpOnly: true,sameSite: 'Strict' }).json({
            message: 'Logged out successfully.',
            success: true,
            isLoggedIn:false
        });
    } catch (error) {
      res.status(500).json({ message: error.message, success:false });
      console.log(error);
    }
};

// Get USer Profile

export const getProfile = async (req, res) => {
    try {
      const userId = req.params.id; 
  
      const user = await User.findById(userId).select('-password'); 
      if (!user) {
        return res.status(404).json({ message: 'User not found', success:false });
      }

      user= {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        bio: user.bio,
        websiteLink: user.websiteLink,
        profilePhoto: user.profilePhoto.imageLink,
        gender: user.gender,
      }
  
      res.status(200).json({
        success:true,
        user
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  };

// Edit Profile
export const editProfile = async (req, res) => {
  try {
    const { fullName, bio, websiteLink, gender } = req.body;

    
    const { error } = profileEditSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let profilePic = req.file?.path; 

    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
        success: false
      });
    }

    if (profilePic) {
      const fileMimeType = req.file.mimetype;
      // Check if the uploaded file is an image
      if (!fileMimeType.startsWith('image/')) {
        return res.status(400).json({
          message: 'Invalid file type. Only images are allowed.',
          success: false
        });
      }
     
      if(user.profilePhoto.publicId)
      {
        cloudinary.api.delete_resources(
          [user.profilePhoto.publicId],
          { type: 'upload', resource_type: 'image' }
        )
        .then(result => console.log(result))
        .catch(error => console.error('Error deleting resources:', error));
      }
      
      let avatar = await fileUploadOnCloudonary(profilePic);
      user.profilePhoto.publicId = avatar?.public_id || "";
      user.profilePhoto.imageLink = avatar?.secure_url || "";
    }

    // Update other fields if provided
    if (fullName) user.fullName = fullName;
    if (bio) user.bio = bio;
    if (websiteLink) user.websiteLink = websiteLink;
    if (gender) user.gender = gender;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};


// Search users by username (or other criteria like email, etc.)
export const searchUsers = async (req, res) => {
  try {
    const { query, page=1 , limit=3 } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required", success:false });
    }

    // Split query into parts (characters, words, etc.)
    const searchParts = query.split("").map(part => ({
      username: { $regex: part, $options: "i" },
    }));

    let skip = (page-1) * limit

    // Use $and to match all parts
    const users = await User.find({
      $and: searchParts
    }).skip(skip).limit(Number(limit))
    .select("username profilePhoto fullName");

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message, success:false });
  }
};



// Follow a user
export const followUser = async (req, res) => {
  try {
    const userId = req.userId; 
    const targetUserId = req.params.id; // ID of the user to follow

    if (userId === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" , success:false});
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found", success:false });
    }

    // Check if already following
    if (user.following.includes(targetUserId)) {
      return res.status(400).json({ message: "Already following this user", success:false });
    }

    // Add target user to following list and logged-in user to follower list
    user.following.push(targetUserId);
    targetUser.followers.push(userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: `You are now following ${targetUser.username}`, success:true });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message,success:false });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const userId = req.userId; 
    const targetUserId = req.params.id; // ID of the user to unfollow

    if (userId === targetUserId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" ,success:false });
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found",success:false });
    }

    // Check if already not following
    if (!user.following.includes(targetUserId)) {
      return res.status(400).json({ message: "You are not following this user" ,success:false});
    }

    // Remove target user from following list and logged-in user from follower list
    user.following = user.following.filter(id => id.toString() !== targetUserId);
    targetUser.followers = targetUser.followers.filter(id => id.toString() !== userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: `You have unfollowed ${targetUser.username}`, success:true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message,success:false });
  }
};


// Get suggested users
export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.userId; 
    const { limit = 10 } = req.query; 

    // Find the current user to get their following list
    const user = await User.findById(userId).select('following');

    if (!user) {
      return res.status(404).json({ message: "User not found", success:false });
    }

    // Fetch users excluding the current user and the ones they are already following
    const suggestedUsers = await User.find({
      _id: { $ne: userId, $nin: user.following }, 
    })
      .select('username profilePhoto following') 
      .limit(Number(limit)) 
      .exec();

    res.status(200).json({ suggestedUsers , success:true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message, success:false });
  }
};

// controller/user.controller.js



// Get advanced suggested users
export const getAdvancedSuggestedUsers = async (req, res) => {
  try {
    const userId = req.userId; 
    const { limit = 10 } = req.query; // Optional limit, default 10 users

    // Find the current user to get their following list
    const user = await User.findById(userId).select('following');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch users with advanced criteria:
    const suggestedUsers = await User.aggregate([
      // Stage 1: Exclude users already followed and the current user
      {
        $match: {
          _id: { $ne: user._id, $nin: user.following },
        },
      },


      // Stage 2: Add a field for mutual followers count
      {
        $addFields: {
          mutualFollowersCount: {
            $size: {
              $setIntersection: ["$followers", user.following],
            },
          },
        },
      },
      {
        $sample: { size: Number(limit) }
      },
      // Stage 3: Prioritize by mutual followers and follower count
      {
        $sort: {
          mutualFollowersCount: -1, // Sort by most mutual followers
          followers: -1, // Then sort by most followers
        },
      },
      // Stage 4: Limit the number of results
      // {
      //   $limit: Number(limit),
      // },
        //Stage 5: to get random users
   
      // Stage 6: Project only relevant fields
      {
        $project: {
          username: 1,
          profilePhoto: 1,
          mutualFollowersCount: 1,
        },
      }
    
    
    ]);

    res.status(200).json({ suggestedUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



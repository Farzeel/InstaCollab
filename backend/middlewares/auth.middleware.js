import jwt from "jsonwebtoken";

export const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                message:'User not authenticated',
                success:false
            });
        }
        const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decode){
            return res.status(401).json({
                message:'Invalid token',
                success:false
            });
        }
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message,
            success:false
        });
       
    }
}

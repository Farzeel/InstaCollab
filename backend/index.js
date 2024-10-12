// Import express
import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import { connectDB } from "./db.js";

const app = express();


dotenv.config({
    path:"./env"
})

connectDB();
 
app.use(express.json());

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.urlencoded({extended:true, limit:"16kb"}))

app.use(cookieParser())

app.use(express.static("public"))


// Define a basic route
import userRoute from "./routes/user.routes.js"
import postRoute from "./routes/post.routes.js"

app.use("/api/v1/users", userRoute)
app.use("/api/v1/posts", postRoute)

// listen on port
app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})

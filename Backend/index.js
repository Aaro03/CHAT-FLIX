import express, { urlencoded } from "express";
//dotenv to not store port number in this file
import dotenv from "dotenv"; 
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"
import cors from "cors";

databaseConnection();

dotenv.config({
    path:".env"
})
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOptions));

//creating api
app.use('/api/v1/userController',userRoute);

// app.get("/",(req,res)=>{
//     res.status(200).json({
//         mesage:"hello, I am coming from backends",
//         success:true
//     })
// })

app.listen(process.env.port,()=>{
    console.log(`port at ${process.env.port}`);
})
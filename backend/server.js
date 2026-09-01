//Module imports 
import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


import connectDB from "./conn.js"


//Important variables 
const APP = express()
const PORT =  process.env.PORT || 3000
const allowedOrigins = [
  "http://localhost:5173"
];


//Use of middleware
APP.use(express.json())
APP.use(express.urlencoded({extended:true}))
APP.use(cookieParser());
//CORS middleware to allow requests from the frontend
APP.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);


//Import routes
import userRoutes from "./routes/userRoutes.js";




//Middleware to see information on request 
APP.use((req, res, next) => {
  console.log(`Getting a ${req.method} request from ${req.url}.`);
  console.log(`The body is:`);
  console.log(req.body);
  next();
});


APP.use("/api/users", userRoutes);


APP.get("/api/refresh",(req,res)=>{
  console.log(req.cookies)
  res.json({message:"Refresh endpoint"})
})



APP.use((err, req, res, next) => {
  console.log('Error middleware triggered')
  console.error(err.message)
  res.status(500).json({ message: "Internal server error.", payload: null, error: err.message })
})




APP.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`)
    connectDB()
})


//Module imports 
import "dotenv/config"
import express from "express"
import cors from "cors"


//Important variables 
const APP = express()
const PORT = 3000 || process.env.PORT
const allowedOrigins = [
  "http://localhost:5173"
];


//Use of middleware
APP.use(express.json())
APP.use(express.urlencoded({extended:true}))

//CORS middleware to allow requests from the frontend
APP.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);




//Middleware to see information on request 
APP.use((req, res, next) => {
  console.log(`Getting a ${req.method} request from ${req.url}.`);
  console.log(`The body is:`);
  console.log(req.body);
  next();
});









APP.use((err,req,res,next)=>{
  console.log('Error middleware triggered')
  console.error(err.message)
})




APP.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`)
})


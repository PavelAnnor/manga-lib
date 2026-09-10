//Module + middleware imports 
import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import {createAccessToken,createRefreshToken,verifyRefreshToken} from "./util/token.js"
import { authenticateToken } from "./middleware/authenticateToken.js";


import connectDB from "./conn.js"


//Important variables 
const APP = express()
const PORT =  process.env.PORT || 3000
const allowedOrigins = [
  "http://localhost:5173"
];

//Import routes
import userRoutes from "./routes/userRoutes.js";
import refreshRoutes from "./routes/refreshRoutes.js"
import mangaDexAPIRoutes from "./routes/mangaDexAPIRoutes.js"




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







//Middleware to see information on request 
APP.use((req, res, next) => {
  console.log(`Getting a ${req.method} request from ${req.url}.`);
  console.log(`The body is:`);
  console.log(req.body);
  next();
});


APP.use("/api/users", userRoutes);
APP.use("/api/refresh",refreshRoutes)

//Middle ware to check for and veirify access token beofre accessing certain resoruces 
APP.use(authenticateToken)
APP.use("/api/mangaDexAPI",mangaDexAPIRoutes)


APP.get("/api/cookies",(req, res) => {
  // res.clearCookie("refreshToken");
  const r = {rToken:req.cookies.refreshToken}
  console.log(req.cookies.refreshToken);
  res.status(200).json(r)
  //Clear the refresh token cookie on the clinet


  // //Find the refreshToken cookie
  // const refreshToken = req.cookies.refreshToken;

  // //verify it, make sure its not expired
  // const payload = verifyRefreshToken(refreshToken);

  // //extract safe user and jti separatley
  // const { safeUser, jti } = payload;

  // //if it is expired
  // if (!payload) {
  // }

  // //if its not generare access token with safe user info
  // const accessToken = createAccessToken(safeUser);

  // //generate a new refresh token with safe
  // const newRefreshToken = createRefreshToken(safeUser, jti);

  // //update the ttl of the refresh token in the db

  // // res.cookie the refresh token
  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   path: "/api",
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  // });

  // //res.json the response with the safe user data and JWT access tokens
  // res.status(201).json({
  //   success: true,
  //   message: "Token Authentication successful",
  //   payload: { user: safeUser, accessToken: accessToken },
  //   error: null,
  // });

  // // res.json({ message: "Refresh endpoint" });
})


APP.get("/api/cleanse",(req, res) => {
  // Source - https://stackoverflow.com/a/61403095
  // Posted by Tushar Tambe
  // Retrieved 2026-09-04, License - CC BY-SA 4.0

  const cookies = req.cookies;

  for (let prop in cookies) {
    res.clearCookie(prop); //Or res.cookie(prop, '', {expires: new Date(0)});
  }
})






// APP.use((err, req, res, next) => {
//   console.log('Error middleware triggered')
//   console.error(err.message)
//   res.status(500).json({ message: "Internal server error.", payload: null, error: err.message })
// })




APP.listen(PORT,()=>{
    console.log(`Server is listening on port: ${PORT}`)
    connectDB()
})


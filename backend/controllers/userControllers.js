import UserModel from "../models/usersModel.js";
import RefreshTokenModel from "../models/refreshTokensModel.js";

import { createRefreshToken,createAccessToken} from "../util/token.js";
import { randomUUID } from "crypto";

//Function to create a new user in Mongo, returning the safe user data (without password) and JWT tokens
async function createUser(req, res) {
  try {

    //try to create the user in the database
    // const response = await UserModel.create(req.body);

      let safeUser;

     const responseTest = UserModel.create(req.body).then( (response)=>{

     
      const { password, ...safeCredentials } = response.toObject();
      safeUser=safeCredentials;
       console.log(safeCredentials);
       const now = new Date();
       const thirtyDaysLater = new Date(
         now.getTime() + 30 * 24 * 60 * 60 * 1000,
       );
        const response2 =  RefreshTokenModel.create({
       jti: jti,
       userId: safeCredentials._id,
       expires: thirtyDaysLater})
     })
    // const { password, ...safeUser } = response.toObject();

    //If its successful generate a random uuid and store it as a claim in the refresh token
    const jti = randomUUID();

    // const refreshToken = createRefreshToken({ safeUser,jti: jti });

    //Set the expiry for 30 days 
    // const now = new Date();
    // const thirtyDaysLater = new Date(now.getTime() + 30*24*30 * 60 * 1000);

   
    // //Store the jti in mongoDB
    //  const response2 = await RefreshTokenModel.create({
    //    jti: jti,
    //    userId: safeUser.userId,
    //    expires: thirtyDaysLater,
    //  });



    //genrate an access token 
    // const accessToken = createAccessToken({ safeUser });

    //res.cookie the refresh token
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   path: "/api/refresh",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    // });

    //res.json the response with the safe user data and JWT access tokens
    // res.status(201).json({
    //   success:true,
    //   message: "User created successfully.",
    //   payload: { user: safeUser, accessToken: accessToken },
    //   error: null,
    // });

    res.json("test")
  } catch (error) {

    console.log(error.message)
    if (error.message === "That username already exists."){
      res.status(409).json({
        success: false,
        message: "Username already in use",
        payload: null,
        error: error.message,
      });
      return
    }

      if(error.message==="That email is already in use."){
        res.status(409).json({
          success: false,
          message: "Email already in use",
          payload: null,
          error: error.message,
        });
        return;
      }

      res
        .status(400)
        .json({
          success: false,
          message: "Unable to create user, check your input and try again.",
          payload: null,
          error: error.message,
        });
        
  }
}



async function loginUser(req, res) {
try{
  //Authentication Process with provicded credentials
  const q = req.body;
  const response = await UserModel.findOne({
    password: req.body.password,
    $or: [{ email: req.body.username }, { username: req.body.username }],
  });

  //If user isnt found
  if (!response) {
    //if find is unsuccessful, send a custom error message
    res.status(401).json({
      success:false,
      message: "Log in Fail Check Credentials",
      payload: null,
      error: "Login credentials are incorrect",
    });
    return;
  }

  //extract claims I want to send back to front end
  const { password, ...safeUser } = response.toObject();

  //create jwt  access and refresh tokens
  const refreshToken = createAccessToken({ safeUser }) ;
  const accessToken = createRefreshToken({ safeUser });

  //res.cookie the refresh token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/api/refresh",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  //res.json the access token
  res
    .status(200)
    .json({
      success:true,
      message: "Successful Login!",
      payload: { accessToken: accessToken, user:safeUser },
      error:null
    });

  return;
}

catch (error){


  res.status(500).json({success:false, message: "Failed to log in user.", payload: null, error: error.message });


}

}



async function logoutUser(req, res) {
  try {
    //Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      path: "/api/refresh"
    });

    //Send a success response
    res.status(200).json({
      success: true,
      message: "Successfully logged out.",
      payload: null,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to log out user.",
      payload: null,
      error: error.message
    });
  }
}

export { createUser, loginUser, logoutUser };
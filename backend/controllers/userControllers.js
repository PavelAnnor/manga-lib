import UserModel from "../models/usersModel.js";

import { createRefreshToken,createAccessToken} from "../util/token.js";

//Function to create a new user in Mongo, returning the safe user data (without password) and JWT tokens
async function createUser(req, res) {
  try {

    //try to create the user in the database
    const response = await UserModel.create(req.body);
    const { password, ...safeUser } = response.toObject();

    //If its successful create a response with the safe user data and JWT tokens
    const refreshToken = createRefreshToken({ safeUser });
    const accessToken = createAccessToken({ safeUser });

    //res.cookie the refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    //res.json the response with the safe user data and JWT access tokens
    res.status(201).json({
      success:true,
      message: "User created successfully.",
      payload: { user: safeUser, accessToken: accessToken },
      error: null,
    });
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
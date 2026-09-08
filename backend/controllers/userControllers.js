import UserModel from "../models/usersModel.js";
import RefreshTokenModel from "../models/refreshTokensModel.js";
import {HTTPError} from "../util/error.js";
import { createRefreshToken,createAccessToken, verifyRefreshToken} from "../util/token.js";
import { randomUUID } from "crypto";


async function createUser(req, res) {

    let createdUser = null;

    try {

      //create the random jti
      const jti = randomUUID();

      //Function to create a user document in MONGO and return safeuser data (data minus password)
      async function makeUser() {
        const response = await UserModel.create(req.body);
        const { password, ...safeUser } = response.toObject();
        return safeUser;
      }

      //Function to create a "refreshToken" document in mongo with an expiry of 30 days
      async function makeRefresh(userData) {
        const now = new Date();
        const thirtyDaysLater = new Date(
          now.getTime() + 30 * 24 * 60 * 60 * 1000,
        );
        await RefreshTokenModel.create({
          userId: userData._id,
          jti: jti,
          expires: thirtyDaysLater,
        });
      }

      //make the documents
      const safeUser = await makeUser();
      createdUser = safeUser;
      const refreshResponse = await makeRefresh(safeUser);

      //create access token
      const accessToken = createAccessToken( safeUser);

      //create refresh token with jti as an added claim
      const refreshToken = createRefreshToken({ ...safeUser, jti: jti });

      //res.cookie the refresh token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

      //res.json the response with the safe user data and JWT access tokens
      res.status(201).json({
        success: true,
        message: "User created successfully.",
        payload: { user: safeUser, accessToken: accessToken },
        error: null,
      });
    } catch (error) {
      // Only roll back if a user was actually created this request
      if (createdUser) {
        await UserModel.deleteOne({ _id: createdUser._id });
      }
      console.log(error.message);

      //Conclifct errors pt1
      if (error.message === "That username already exists.") {
        res.status(409).json({
          success: false,
          message: "Username already in use",
          payload: null,
          error: "Username must be unqiue",
        });
        return;
      }

      //Conclifct errors pt2
      if (error.message === "That email is already in use.") {
        res.status(409).json({
          success: false,
          message: "Email already in use",
          payload: null,
          error:
            "Email is already in use. Log in with email or use another one.",
        });
        return;
      }

      //anythih else
      res.status(400).json({
        success: false,
        message: "Unable to Create User Check Inputs and Try Again",
        payload: null,
        error: "Unable to create user in database",
      });
    }
 
}




async function loginUser(req,res){



  try {

    //create the new random jti
    const Newjti = randomUUID();

    //Function to authenicate user with DB Look up
    async function authenticateUser() {
      const response = await UserModel.findOne({
        password: req.body.password,
        $or: [{ email: req.body.username }, { username: req.body.username }],
      });

      //if I get no user found throw an error
      if (!response) {
        throw new HTTPError(
          401,
          "Login Credentials are Incorrect",
          "No User Found Check Credentials and Try Again",
        );
       
      }

      // extract all the informafion except the password and return it
      const { password, ...safeUser } = response.toObject();
      return safeUser;
    }

    async function makeRefresh(userData) {
      //Set the expiry for the document for 30 days
      const now = new Date();
      const thirtyDaysLater = new Date(
        now.getTime() + 30 * 24 * 60 * 60 * 1000,
      );

      //make the document representing the the refresh token
      await RefreshTokenModel.create({
        userId: userData._id,
        jti: Newjti,
        expires: thirtyDaysLater,
      });
    }

    //await the db calls
    const safeUser = await authenticateUser();
    const refreshResponse = await makeRefresh(safeUser);

    //create access token
    const accessToken = createAccessToken( safeUser );
  

    //create refresh token with new jti as a claim
    const refreshToken = createRefreshToken( {...safeUser, jti:Newjti});
   
    // res.cookie the refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    //res.json the response with the safe user data and JWT access tokens
    res.status(201).json({
      success: true,
      message: "Log in successful",
      payload: { user: safeUser, accessToken: accessToken },
      error: null,
    });
  } catch (error) {
    console.log(error)

    //if its a custom error  I threw
    if (error.customFrontEndMessage){
       res.status(error.statusCode).json({
         success: false,
         message: error.customFrontEndMessage,
         payload: null,
         error: "Problem loging in ",
       });
       return

    }

    //anythign else
      res.status(500).json({
        success: false,
        message: "Something Went Wrong Please Try Again",
        payload: null,
        error: "Internal server error",
      });
      return
    
  }
  
}




async function logoutUser(req, res) {
  try {

    const refreshToken = req.cookies.refreshToken;

    // No cookie at all — already logged out, nothing to do
    if (!refreshToken) {
      res.clearCookie("refreshToken", { httpOnly: true, path: "/api" });
      return res.status(200).json({
        success: true,
        message: "Successfully logged out.",
        payload: null,
        error: null,
      });
    }


    let jti;

    //try to verify the refresh token
    try {
      ({ jti } = verifyRefreshToken(refreshToken));
    } catch (err) {
      // Invalid/expired token — still just clear the cookie and report success
      res.clearCookie("refreshToken", { httpOnly: true, path: "/api" });
      return res.status(200).json({
        success: true,
        message: "Successfully logged out.",
        payload: null,
        error: null,
      });
    }

    await RefreshTokenModel.deleteOne({ jti });

    res.clearCookie("refreshToken", { httpOnly: true, path: "/api" });

    res.status(200).json({
      success: true,
      message: "Successfully logged out.",
      payload: null,
      error: null,
    });
  } catch (error) {
    // Only genuine unexpected failures (e.g. DB connection down) land here
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to log out user.",
      payload: null,
      error: "Internal server error",
    });
  }
}

export { createUser, loginUser, logoutUser };
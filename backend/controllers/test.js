import UserModel from "../models/usersModel.js";
import RefreshTokenModel from "../models/refreshTokensModel.js";

import { createRefreshToken, createAccessToken } from "../util/token.js";
import { randomUUID } from "crypto";

async function createUser(req, res) {


    try {
      //create the random jti
      const jti = randomUUID();

      async function makeUser() {
        //perform the creation of the user document first
        const response = await UserModel.create(req.body);

        //when that resolves, extract all the informafion except the password
        const { password, ...safeUser } = response.toObject();
        return safeUser;
      }

      async function makeRefresh(userData) {
        //Set the expiry for the document for 30 days
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

      const safeUser = await makeUser();
      const refreshResponse = await makeRefresh(safeUser);

      const accessToken = createAccessToken({ safeUser });
      const refreshToken = createRefreshToken({ safeUser, jti: jti });

      // res.cookie the refresh token
      res.cookie("refreshToken", rToken, {
        httpOnly: true,
        path: "/api/refresh",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

      //res.json the response with the safe user data and JWT access tokens
      res.status(201).json({
        success: true,
        message: "User created successfully.",
        payload: { user: safeUser, accessToken: aToken },
        error: null,
      });
    } catch (error) {

         console.log(error.message);
         if (error.message === "That username already exists.") {
           res.status(409).json({
             success: false,
             message: "Username already in use",
             payload: null,
             error: error.message,
           });
           return;
         }

         if (error.message === "That email is already in use.") {
           res.status(409).json({
             success: false,
             message: "Email already in use",
             payload: null,
             error: error.message,
           });
           return;
         }

         res.status(400).json({
           success: false,
           message: "Unable to create user, check your input and try again.",
           payload: null,
           error: error.message,
         }); 

        
    }
 
}

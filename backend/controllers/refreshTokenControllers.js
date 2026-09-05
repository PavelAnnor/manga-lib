import RefreshTokenModel from "../models/refreshTokensModel.js";
import {
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
} from "../util/token.js";
import { randomUUID } from "crypto";

async function refreshCycle(req, res) {
  try {

    console.log("Refresh cylce testing");
    console.log(req.cookies.refreshToken);
    
    //Find the refreshToken cookie
    const refreshToken = req.cookies.refreshToken;

    //verify it, make sure its not expired
    const payload = verifyRefreshToken(refreshToken);
    console.log("payload")
    console.log(payload)

    //extract safe user and jti separatley
    const { safeUser, jti } = payload;
    console.log("safeUser")
    console.log(safeUser)

    console.log("jti")
    console.log(jti)

    //generare access token with safe user info
    const accessToken = createAccessToken(safeUser);
    console.log("new acccess token")
    console.log(accessToken)

    //create the random jti
    const newJTI = randomUUID();
    console.log("new JTI")
    console.log(newJTI)

    //generate a new refresh token with safe user and new JTI
    const newRefreshToken = createRefreshToken({safeUser, jti:newJTI});

    //create new expiry
    //Set the expiry for the document for 30 days
    const now = new Date();
    const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    //update the ttl of the refresh token in the db
    const response = await RefreshTokenModel.findOneAndUpdate(
      { jti: jti },
      { $set: { jti: newJTI, expires: thirtyDaysLater } },
    );

    // res.cookie the new refresh token
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      path: "/api",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    //res.json the response with the safe user data and JWT access tokens
    res.status(201).json({
      success: true,
      message: "Token Authentication successful",
      payload: { user: safeUser, accessToken: accessToken },
      error: null,
    });
  } catch (error) {
    //res.json the response with the safe user data and JWT access tokens
    console.log(error)
    res.status(201).json({
      success: false,
      message: "Token Authentication unsucessfull",
      payload: null,
      error: error.message,
    });
  }
}



export {refreshCycle}
import RefreshTokenModel from "../models/refreshTokensModel.js";
import {
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
} from "../util/token.js";
import {HTTPError} from "../util/error.js";
import { randomUUID } from "crypto";

async function refreshCycle(req, res) {
  
  
  
  
  try {

    
    //Find the refreshToken cookie
    const refreshToken = req.cookies.refreshToken;

    //if they have no refreshToken 
    if(!refreshToken){
      throw new HTTPError(401,"No refresh token found please log in again", "Automatic login failed please log in again.")
    }

    //verify it, make sure its not expired
    const payload = verifyRefreshToken(refreshToken);
    console.log("payload")
    console.log(payload)

    //extract the old jti 
    const oldJTI = payload.jti
    

    //also check in th db if its even there 
    const r = await RefreshTokenModel.findOne({jti:oldJTI})

    //if its not 
    if (!r) {
      // Token was valid JWT but not found in DB — either already rotated
      // and reused, or fully bogus. Nuke all sessions for this user.
      await RefreshTokenModel.deleteMany({ userId: safeUser._id });

      return res.status(401).json({
        success: false,
        message: "Session invalid. Please log in again.",
        payload: null,
        error: "Refresh token reuse detected",
      });
    }
     
    

   
    //generare access token with safe user info
    const { iat,exp,jti,...safeUser } = payload;
    console.log(safeUser)

    
    const accessToken = createAccessToken(safeUser);
    console.log("new access")
    console.log(accessToken)

    
   

    //create the random jti
    const newJTI = randomUUID();
  

    //generate a new refresh token with safe user and new JTI
    const newRefreshToken = createRefreshToken({...safeUser, jti:newJTI});
    console.log("refresh")
    console.log(newRefreshToken)

  

    //create new expiry
    //Set the expiry for the document for 30 days
    const now = new Date();
    const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    //update the ttl of the refresh token in the db and the jti
    const response = await RefreshTokenModel.findOneAndUpdate(
      { jti: oldJTI },
      { $set: { jti: newJTI, expires: thirtyDaysLater } },
    );

    // res.cookie the new refresh token
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      path: "/api",
      maxAge: 30 * 24 * 60 * 60 * 1000,
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

    //custome error i threw
    if(error.customFrontEndMessage){
      res.status(error.statusCode).json({
        success:false,
        message:error.customFrontEndMessage,
        payload:null,
        error:error.message
      })
      return
    }
    //res.json the response with the safe user data and JWT access tokens
    console.log(error)
    res.status(401).json({
      success: false,
      message: "Token Authentication unsucessfull",
      payload: null,
      error: error.message,
    });
  }
}



export {refreshCycle}
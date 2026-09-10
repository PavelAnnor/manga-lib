import "dotenv/config"
import jwt from "jsonwebtoken"
import { HTTPError } from "./error.js";

//Function to generate an access token
function createAccessToken(payload) {

    const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn: "30m"});
    return token
    
}


//Function to generate a refresh token
function createRefreshToken(payload) {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return token;
}

//Function to authenticate a JWT access token
function verifyAccessToken(token){

  try {
    return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
  } catch (error) {

    switch (error.name) {
      //token expired
      case "TokenExpiredError":
        throw new HTTPError(401,err.name,"Token is expired. Please log in again")
        break;

      //malformed, bad signiture, etc
      case "JsonWebTokenError":
         throw new HTTPError(
           401,
           error.name,
           "Token is malfored or invalid. Please log in again",
         );
        break;

      //token used before is nbf claim
      case "NotBeforeError":
         throw new HTTPError(
           401,
           error.name,
           "Token cannot be used on this date. Please Log in again",
         );
        break;

      default:
        throw new HTTPError(500, error.name, "Unable to verify token.");
        break;
    }
    
  }

   
}


//Function to authenticate a JWT token
function verifyRefreshToken(token){

  try {
   return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    // decoded payload
  } catch (error) {
    // err.name will be one of:
    console.log("Error Verifying Access token")
    console.log(error.name)

    switch (error.name) {
      //token expired
      case "TokenExpiredError":
        throw new HTTPError(401, error.name, "Token is expired. Please log in again");
        break;

      //malformed, bad signiture, etc
      case "JsonWebTokenError":
        throw new HTTPError(
          401,
          "son",
          "Token is malfored or invalid. Please log in againnnnn",
        );
        break;

      //token used before is nbf claim
      case "NotBeforeError":
        throw new HTTPError(
          401,
          error.name,
          "Token cannot be used on this date. Please Log in again",
        );
        break;

      default:
        throw new HTTPError(500, error.name, "Unable to verify token.");
        break;
    }
   
  }
    
}


function decodeRefreshToken(token){

}


function decodeAccessToken(token){

    const payload = jwt.decode(token)
    return payload
}





export {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeRefreshToken,
  decodeAccessToken
};

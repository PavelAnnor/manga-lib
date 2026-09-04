import "dotenv/config"
import jwt from "jsonwebtoken"

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

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new Error("Invalid token")
        }
        return decoded
    })

}


//Function to authenticate a JWT token
function verifyRefreshToken(token){

  try {
   return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    // decoded payload
  } catch (err) {
    // err.name will be one of:

   switch (err.name) {

    //token expired
     case "TokenExpiredError":
       break;

       //malformed, bad signiture, etc
     case "JsonWebTokenError":
       break;

       //token used before is nbf claim
     case "NotBeforeError":
       break;

     default:
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

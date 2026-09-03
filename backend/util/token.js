import "dotenv/config"
import jwt from "jsonwebtoken"

//Function to generate an access token
function createAccessToken(payload) {

   
    const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn: "15m"});
    return token
    
}


//Function to generate a refresh token
function createRefreshToken(payload) {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  return token;
}

//Function to authenticate a JWT token
function authenticateToken(token){

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new Error("Invalid token")
        }
        return decoded
    })

}



export {createAccessToken, createRefreshToken, authenticateToken}

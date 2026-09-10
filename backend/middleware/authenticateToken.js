import { verifyAccessToken } from "../util/token.js";

//middle ware to intercept a request, check the authorization header, extract access token 
//and verify it, 
//If fine, hit next 
//if not, res.json a 401 error to let client know access token is expired and they should hit 
//the refresh endpoint 
function authenticateToken(req,res,next){


    try {
    
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
     

      



      //if no access token
      if (token==="undefined") {
        res.status(401).json({
          success: false,
          message: "No Access token present",
          payload: null,
          error:
            "No Access token present in authorization Header. In the format 'bearer <token>",
        });
        return;
      }
      //verifty and exptract the payload 
      const payload  = verifyAccessToken(token)

      //set req.user to the pyalod (will return the user_id and other claims needed for other fucntons )
      req.user = payload

      next();

      // next()
    } catch (error) {
        
        console.log(error.message)
        //Catch the custome http errors I threw
        if(error.customFrontEndMessage){
         res.set(
           "WWW-Authenticate",
           'Bearer error="invalid_token", error_description="Access token is expired or malformed"',
         ).status(error.statusCode).json({
           success: false,
           error: "Access token is expired or malformed.",
           payload: null,
           message: error.customFrontEndMessage,
         });

         return 
        }


         return res.status(500).json({
           success: false,
           error: "Internal server error",
           payload: null,
           message: "Something went wrong while verifying your token.",
         });


        
    }
}


export {authenticateToken}
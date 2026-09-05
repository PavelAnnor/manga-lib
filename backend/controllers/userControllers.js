import UserModel from "../models/usersModel.js";
import RefreshTokenModel from "../models/refreshTokensModel.js";
import {HTTPError} from "../util/error.js";
import { createRefreshToken,createAccessToken, verifyRefreshToken} from "../util/token.js";
import { randomUUID } from "crypto";



// function createUser  (req, res){

//  //create vars for access and refresh tokens to be sent back to front end
//   let aToken;
//   let rToken;

//   //Create random UUID to be stored as a jti claim
//   const jti = randomUUID();

//   //Create a userDocument in the DB
//   const response = UserModel.create(req.body).then((response) => {
//     //when that resolves, extract all the informafion except the password
//     const { password, ...safeUser } = response.toObject();

//     //genrate an access token
//     const accessToken = createAccessToken({ safeUser });
//     aToken=accessToken
//     console.log("Access token")
//      console.log(accessToken);

//     //generate a refreshToken
//     const refreshToken = createRefreshToken({ safeUser, jti: jti });
//     rToken=refreshToken
//      console.log("Refresh token");
//       console.log(refreshToken);

//       //add a jti property 
//       safeUser.jti = jti
    

   


//     return safeUser

   
//   }).then(

//     (safeUser) => {
//       //When the intial call to user collection is done and susccessful 
//       //Make a call to the db to create the refresh token

//       //Set the expiry for 30 days
//       const now = new Date();
//       const thirtyDaysLater = new Date(
//         now.getTime() + 30 * 24 * 60 * 60 * 1000,
//       );
      
//       const response = RefreshTokenModel.create({
//         jti: safeUser.jti,
//         userId: safeUser._id,
//         expires: thirtyDaysLater,
//       })


//       return safeUser
//     }
    
//     ).then(

//       (safeUserInfo)=>{
//         //when EVEYTHIGN finally resolves

//         //send the access token in the body

//         const {safeUser,jti} = safeUserInfo

     

//             // res.cookie the refresh token
//             res.cookie("refreshToken", rToken, {
//               httpOnly: true,
//               path: "/api/refresh",
//               maxAge: 7 * 24 * 60 * 60 * 1000,
//               secure: process.env.NODE_ENV === "production",
//               sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//             });

//            //res.json the response with the safe user data and JWT access tokens
//             res.status(201).json({
//               success:true,
//               message: "User created successfully.",
//               payload: { user: safeUser, accessToken: aToken },
//               error: null,
//             });
//       }
//     ).catch( (error) => {
//     console.log(error.message)
//     if (error.message === "That username already exists."){
//       res.status(409).json({
//         success: false,
//         message: "Username already in use",
//         payload: null,
//         error: error.message,
//       });
//       return
//     }

//       if(error.message==="That email is already in use."){
//         res.status(409).json({
//           success: false,
//           message: "Email already in use",
//           payload: null,
//           error: error.message,
//         });
//         return;
//       }

//       res
//         .status(400)
//         .json({
//           success: false,
//           message: "Unable to create user, check your input and try again.",
//           payload: null,
//           error: error.message,
//         }); 

//   }
// )}



//Function to create a new user in Mongo, returning the safe user data (without password) and JWT tokens
// async function createUser(req, res) {
//   try {

    
     
   


   
   

   





    

//     //res.cookie the refresh token
//     // res.cookie("refreshToken", refreshToken, {
//     //   httpOnly: true,
//     //   path: "/api/refresh",
//     //   maxAge: 7 * 24 * 60 * 60 * 1000,
//     //   secure: process.env.NODE_ENV === "production",
//     //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//     // });

//     //res.json the response with the safe user data and JWT access tokens
//     // res.status(201).json({
//     //   success:true,
//     //   message: "User created successfully.",
//     //   payload: { user: safeUser, accessToken: accessToken },
//     //   error: null,
//     // });

//     res.json("test")
//   } catch (error) {

//     console.log(error.message)
//     if (error.message === "That username already exists."){
//       res.status(409).json({
//         success: false,
//         message: "Username already in use",
//         payload: null,
//         error: error.message,
//       });
//       return
//     }

//       if(error.message==="That email is already in use."){
//         res.status(409).json({
//           success: false,
//           message: "Email already in use",
//           payload: null,
//           error: error.message,
//         });
//         return;
//       }

//       res
//         .status(400)
//         .json({
//           success: false,
//           message: "Unable to create user, check your input and try again.",
//           payload: null,
//           error: error.message,
//         });
        
//   }
// }

async function createUser(req, res) {


    try {

      //create the random jti
      const jti = randomUUID();

      async function makeUser() {

        //perform the creation of the user document first
        const response = await UserModel.create(req.body);

        // extract all the informafion except the password  and return that
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
          jti: jti,
          expires: thirtyDaysLater,
        });
      }

      //make the documents 
      const safeUser = await makeUser();
      const refreshResponse = await makeRefresh(safeUser);

      //create access token 
      const accessToken = createAccessToken({ safeUser });

      //create refresh token with jti as a claim
      const refreshToken = createRefreshToken({ safeUser, jti: jti });

      // res.cookie the refresh token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api",
        maxAge: 7 * 24 * 60 * 60 * 1000,
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




async function loginUser(req,res){



  try {


   
    // get the old jti
    const oldRefresh = req.cookies.refreshToken
    const {jti} = verifyRefreshToken(oldRefresh)

    console.log(jti)



    //delete it from DB
    await RefreshTokenModel.findOneAndDelete({ jti: jti });
    //create the random jti
    const Newjti = randomUUID();

    async function authenticateUser() {
      //Authentication Process with provicded credentials
      const q = req.body;
      const response = await UserModel.findOne({
        password: req.body.password,
        $or: [{ email: req.body.username }, { username: req.body.username }],
      });

      //if I get no response throw and error
      if (!response) {
        throw new HTTPError(
          401,
          "Login credentials are incorrect No User found",
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
    const accessToken = createAccessToken({ safeUser });
    console.log("A token from log in")
    console.log(accessToken)
    //create refresh token with jti as a claim
    const refreshToken = createRefreshToken({ safeUser, jti: Newjti });
    console.log("R token from log in");
    console.log(refreshToken);


    // res.cookie the refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

    //if its a custom error message I threw
    if (error.customFrontEndMessage){
       res.status(error.statusCode).json({
         success: false,
         message: error.customFrontEndMessage,
         payload: null,
         error: error.message,
       });
       return

    }

      res.status(401).json({
        success: false,
        message: "Log in Fail Check Credentials",
        payload: null,
        error: error.message,
      });
      return
    
  }
  
}




async function logoutUser(req, res) {
  try {
    //Find the refreshToken cookie
    const refreshToken = req.cookies.refreshToken;
  
    //verify and decode it (it'll throw custom errors to be caught later if token is invalid)
    const {jti, safeUser }= verifyRefreshToken(refreshToken)
    console.log(jti)

    //delete the refresh token from the db using the jti claim
    const response = await RefreshTokenModel.deleteOne({ jti: jti });

    //Clear the refresh token cookie on the clinet
    res.clearCookie("refreshToken", {
      httpOnly: true,
      path: "/api/refresh",
    });

    //Send a success response
    res.status(200).json({
      success: true,
      message: "Successfully logged out.",
      payload: null,
      error: null,
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
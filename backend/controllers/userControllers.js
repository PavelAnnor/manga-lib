import UserModel from "../models/usersModel.js";

import { createRefreshToken,createAccessToken} from "../util/token.js";



//Function to create a new user in DB
async function createUser(req, res) {
  try {
   const response = await UserModel.create(req.body);
   const { password, ...safeUser } = response.toObject();
   res
     .status(201)
     .json({
       message: "User created successfully.",
       payload: safeUser,
       error: null,
     });
  } catch (error) {
    res.status(400).json({ message: "Failed to create user.", payload: null, error: error.message });
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
        message: "Log in Failed.",
        payload: null,
        error: "Login credentials are incorrect",
      });
      return;
    }

    
  
    //extract claims I want to send back to front end
    const {username,_id} = response.toObject()

    //create jwt  access and refresh tokens 
    const refreshToken = createRefreshToken({username:username, userId:_id})
     const accessToken = createRefreshToken({
       username: username,
       userId: _id,
     });

    //res.json the access token 
    res.status(200).json({message:"Successful Login!", payload:accessToken,error:null})
    //res.cookie the refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true, // required for sameSite: "none"
      sameSite: "none",
    });
    return;



}

catch (error){


  res.json(error.message)


}

}

export { createUser,loginUser };
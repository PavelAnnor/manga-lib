import UserModel from "../models/usersModel.js";



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

export { createUser };
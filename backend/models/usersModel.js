import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: [
      true,
      "That username already exists.",
    ],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "That email is already in use."],
  },
  password: { type: String, required: true, select: false },
  createdOn: { type: Date, default: Date.now(), immutable: true },
});


export default mongoose.model("userModel", userSchema, "users");
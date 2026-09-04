import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  jti: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  expires: {
    type: Date,
    required: true,
  },
  revoked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("refreshToken", refreshTokenSchema,"refreshTokens");


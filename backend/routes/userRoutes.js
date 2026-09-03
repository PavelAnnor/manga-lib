import express from "express"
import {createUser,loginUser,logoutUser} from "../controllers/userControllers.js";
const router = express.Router();


router.route("/create-user").post(createUser);
router.route("/login-user").post(loginUser);
router.route("/logout-user").post(logoutUser)

export default router;
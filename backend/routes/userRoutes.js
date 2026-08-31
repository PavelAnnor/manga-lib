import express from "express"
import {createUser,loginUser} from "../controllers/userControllers.js";
const router = express.Router();


router.route("/create-user").post(createUser);
router.route("/login-user").post(loginUser);

export default router;
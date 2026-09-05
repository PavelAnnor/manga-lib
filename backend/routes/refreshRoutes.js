import express from "express"


import { refreshCycle } from "../controllers/refreshTokenControllers.js"


const router = express.Router()


router.route("/refresh-cycle").get(refreshCycle)





export default router
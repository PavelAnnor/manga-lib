import express from "express"


import { searchManga } from "../controllers/mangaDexAPIControllers.js"

const router = express.Router()



router.route("/search-manga/:keyword").get(searchManga)










export default router
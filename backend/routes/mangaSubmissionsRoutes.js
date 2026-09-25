import express from "express"
import { addMangaSubmission,getAllMangaSubmissions } from "../controllers/mangaSubmissionsControllers.js"
const router = express.Router()


router.route("/add-manga-submission").post(addMangaSubmission)
router.route("/get-all-manga-submissions").post(getAllMangaSubmissions)






export default router
import MangaSubmissionsModel from "../models/mangaSubmissionsModel.js";

async function addMangaSubmission(req,res) {


    try {
      const response = await MangaSubmissionsModel.create(req.body);
      
      res.status(201).json({
        success: true,
        error: null,
        message: "Submission Added Successfully",
        payload: [],
      });
      return
    } catch (error) {

      //If duplciation error from mongo
      if (error.code === 11000) {
        res.status(400).json({
          success: false,
          payload: null,
          error: "UserId + mangaDex id combination must be unqiue",
          message: "That Title is Already in Your Library.",
        });
        return
      }

      res.status(400).json({
        success: false,
        payload: null,
        error: "Request body may be malformed or missing fields.",
        message: "Unable to Add Title to Library",
      });

    
    }
   

    
}

async function getAllMangaSubmissions(req,res) {

   try {
     const response = await MangaSubmissionsModel.find({_id:req.body._id});

     res.status(201).json({
       success: true,
       error: null,
       message: "Sumbissions Retrieved Successfully",
       payload: response,
     });
     return;
   } catch (error) {
     

     res.status(400).json({
       success: false,
       payload: null,
       error: "Request body may be malformed or missing fields.",
       message: "Unable to Retireve Data",
     });
   }
   
  
}


export {addMangaSubmission,getAllMangaSubmissions}
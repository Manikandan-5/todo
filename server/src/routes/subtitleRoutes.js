import express from 'express';
import { createsubTitle,getsubTitles,updatesubTitle,deletesubTitle } from '../controller/subtitleController.js';
 const router = express.Router()

 router.get("/subtitles",getsubTitles)
 router.post("/createsubtitle",createsubTitle)
 router.put("/updatesubtitle/:id",updatesubTitle)
 router.delete("/deletesubtitle/:id",deletesubTitle)

 export default router;

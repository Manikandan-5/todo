import express from 'express';
import { createTitle,getTitles,updateTitle,deleteTitle } from '../controller/todotitleController.js';
 const router = express.Router()

 router.get("/titles",getTitles)
 router.post("/createtitle",createTitle)
 router.put("/updatetitle/:id",updateTitle)
 router.delete("/deletetitle/:id",deleteTitle)

 export default router;

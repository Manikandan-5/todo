import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import TodoTitle from './model/todotitleModel.js';
import SubTitle from './model/subtitleModel.js';

import todotitleRoutes from './routes/todotitleRoutes.js'
import subtitleRoutes from './routes/subtitleRoutes.js'

dotenv.config();
connectDB()
const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",todotitleRoutes)
app.use("/api",subtitleRoutes)




app.listen(process.env.PORT,()=>{
    console.log("Server Conected");
    
})
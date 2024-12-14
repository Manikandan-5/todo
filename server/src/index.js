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

const corsOptions = {
    origin: 'https://todo-client-five-chi.vercel.app', // Allow this specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow cookies or authorization headers
  };
  
  app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",todotitleRoutes)
app.use("/api",subtitleRoutes)
app.options('*', cors(corsOptions)); // Handle preflight requests




app.listen(process.env.PORT,()=>{
    console.log("Server Conected");
    
})
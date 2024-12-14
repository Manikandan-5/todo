import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import connectDB from './config/db.js';
import TodoTitle from './model/todotitleModel.js';
import SubTitle from './model/subtitleModel.js';

import todotitleRoutes from './routes/todotitleRoutes.js'
import subtitleRoutes from './routes/subtitleRoutes.js'

dotenv.config();
// connectDB()
const app=express();

app.use(cors());

// Handle HEAD requests for the root path
app.head('/', (req, res) => {
    res.status(200).send();  // Send only headers, with a 200 OK status
  });
  
  // Handle GET requests for the root path
  app.get('/', (req, res) => {
    res.json("Hii");  // Response for GET requests to the root path
  });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use("/api",todotitleRoutes)
// app.use("/api",subtitleRoutes)


<<<<<<< HEAD
=======
// Handle HEAD requests for the root path
app.head('/', (req, res) => {
  res.status(200).send();  // Send only headers, with a 200 OK status
});

// Handle GET requests for the root path
app.get('/', (req, res) => {
  res.json("Hii");  // Response for GET requests to the root path
});
>>>>>>> f45c9a95137d8be8b2d9bee36f959b462767c9c0


app.listen(process.env.PORT,()=>{
    console.log("Server Conected");
    
})
import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("server is working");
})

app.listen(5000,()=>{
    console.log(`Server is running at the PORT : ${port}`);
    connectDb();
});
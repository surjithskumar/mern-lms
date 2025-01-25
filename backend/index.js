import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';

dotenv.config();

const app = express();

//using middleware
app.use(express.json());

const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("server is working");
});

//importing routes
import userRoutes from './routes/user.js'

//using routes
app.use('/api',userRoutes);

app.listen(5000,()=>{
    console.log(`Server is running at the PORT : ${port}`);
    connectDb();
});
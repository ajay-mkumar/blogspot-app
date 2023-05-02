import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogrouter from './routes/blog-routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


const app=express();

app.use(cors());
app.use(express.json({limit:'10mb'}))

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(()=>{
    console.log("mongo connected");
}).catch((err)=>{
    console.log("error:",err);
})

app.use('/user',router);
app.use('/blog',blogrouter);

app.listen(5000);
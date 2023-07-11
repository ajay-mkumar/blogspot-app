import path from 'path';
import express from "express";
import dotenv from "dotenv";
import ProductRouter from './router/ProductRouter.js'
import UserRouter from './router/userRouter.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/config.js";
import cookieParser from "cookie-parser";
import OrderRouter from './router/orderRouter.js';
import UploadRouter from './router/uploadRoutes.js';


dotenv.config();
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const port=5000;

connectDB();
 



app.use('/api/products',ProductRouter);
app.use('/api/users',UserRouter);
app.use('/api/order',OrderRouter);
app.use('/api/upload',UploadRouter);

app.get('/api/config/paypal',(req,res)=>res.json({clientId:process.env.PAYPAL_CLIENT_ID}))
app.use(notFound);
app.use(errorHandler)

const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

app.listen(port,()=>{
    console.log("server started...")
})
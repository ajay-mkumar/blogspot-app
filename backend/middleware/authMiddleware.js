import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../model/UserModel.js";

const protect=asyncHandler(async(req,res,next)=>{
    const token=req.cookies.jwt;

    if(token){
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decode.userId).select('-password');
            next();
        }catch(err){
            console.log(err);
            res.status(404);
            throw new Error("not authroized");
        }
    }else{
        res.status(404);
        throw new Error("not authroized");

    }
})

const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(404);
        throw new Error("not authrozied as admin");
    }
}

export {protect,admin};
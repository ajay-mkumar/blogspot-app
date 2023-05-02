import User from "../models/User.js";
import bcrypt from "bcryptjs"
export const getAlluser=async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"error"});
    }else{
        return res.status(200).json({users});
    }
}

export const addUsers=async(req,res,next)=>{
    const {name,phone,password}=req.body;
    const olduser= await User.findOne({phone});

    try{ 
        if(olduser){
           return res.json({message:"user already exists"});
        }
        let encryptedpassword=await bcrypt.hash(password,10);

        const user=new User({
            name,
            phone,
            password:encryptedpassword,
            blogs:[]
        })
 
        // await User.insertMany({name,email,password:encryptedpassword,blogs:[]});
        user.save();
        return res.status(200).json({message:"successfully registered!",user});
    }catch(err){
        return console.log(err);
    }
}

export const login=async(req,res,next)=>{
    const{phone,password}=req.body;
   
   let olduser;
    try{
         olduser=await User.findOne({phone});
    }catch(err){
        console.log(err);
    }
        if(!olduser){
            return res.json({status:"error",message:"user's not exist"});
        }
        const passwordvalidate=await bcrypt.compare(password,olduser.password);
        if(!passwordvalidate){
            return res.json({status:"error",message:"password's incorrect"});
        }
        return res.status(201).json({message:"loggedin",user:olduser});
    }

export const forgetpassword=async(req,res,next)=>{
    const{phone,password}=req.body;

    let olduser;
    try{
        olduser=await User.findOne({phone});
    }catch(err){
        console.log(err);
    }

    if(!olduser){
        return res.json({message:"user not found"});
    }
    const encryptedpassword=await bcrypt.hash(password,10);

    const user=await User.findOneAndUpdate({phone},{
        password:encryptedpassword
    });

    if(!user){
        res.json({message:"unable to reset password"});
    }
    res.json({message:"password reset successfully",user});
}
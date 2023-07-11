import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import genrateTocken from "../utils/genrateTocken.js";


const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        genrateTocken(res,user._id)
        res.json(user)
    }else{
        res.status(401);
        throw new Error("invalid user");
    }
})

const resigterUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;

    const existuser=await User.findOne({email});

    if(existuser){
        res.status(404);
        throw new Error("User already exists");
    }
    const user=await User.create({
        name,
        email,
        password
    });

    if(user){
        genrateTocken(res,user._id)
        res.status(200).json({user});
    }else{
        res.status(404);
        throw new Error("invalid data");
    }
})

const logoutUser=(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully'})

}

const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(user){
        res.status(200).json(user);
    }else{
        res.status(404)
        throw new Error("user not found")
    }
})

const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;

        if(req.body.password){
            user.password=req.body.password;
        }

        const updatedUser=await user.save();

        res.status(200).json(updatedUser);
    }else{
        res.status(404)
        throw new Error("user not found")
    }
})

const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find().select("-password");
    res.json(users); 
})

const deleteUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(user){
        if(user.isAdmin){
            res.status(404);
            throw new Error("Can't delete Admin");
        }else{
            await User.deleteOne({_id:user._id});
            res.status(200).json({message:"User Deleted Successfully"});
        }
    }else{
        res.status(404);
        throw new Error("Unable to Delete");
    }
})

const getUserById=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select("-password");
    if(user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error("Can't Find User By This Id")
    }
})

const updateUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)

    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        user.isAdmin=Boolean(req.body.isAdmin);

        const updateduser=await user.save();
        res.status(200).json(updateduser);
    }else{
        res.status(404);
        throw new Error("Can't Find User By This Id")
    }
})

export {
    authUser,
    resigterUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}
import mongoose from "mongoose";
import Blog from "../models/blog.js";
import User from "../models/User.js";
export const getAllblog=async(req,res,next)=>{
    let allblog;
    try{
        allblog=await Blog.find().populate('user');
    }catch(err){
        console.log(err);
    }
    if(!allblog){
       return res.status(404).json({message:"no blogs"});
    }
    res.status(201).json({allblog})
}

export const addBlog=async(req,res,next)=>{
    const{title,description,image,user}=req.body;

    let olduser;

    try{
        olduser=await User.findById(user);
    }catch(err){
        console.log(err);
    }

    if(!olduser){
        res.status(404).json({message:"can't find the user by this id"});
    }
    const blog=new Blog({
        title,
        description,
        image,
        user
    });

    try{
        const session=await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        olduser.blogs.push(blog);
        await olduser.save({session});
        await session.commitTransaction();
    }catch(err){
        return res.status(500).json({message:err});
        console.log(err);
    }
    res.status(201).json({blog})
}

export const updateBlog=async(req,res,next)=>{
    const{title,description}=req.body;
    const blogid=req.params.id;
    let blog;
    try{
        blog=await Blog.findByIdAndUpdate(blogid,{
            title,
            description
        })
    }catch(err){
        console.log(err);
        
    }
    if(!blog){
        res.status(500).json({message:"unable to update"});
    }
    res.status(201).json({blog});
}

export const getById=async(req,res,next)=>{
    const id=req.params.id;
    let blog;

    try{
        blog=await Blog.findById(id);
    }catch(err){
        console.log(err);
    }


    if(!blog){
        res.status(404).json({message:"no blog found"});
    }
    res.status(200).json({blog});
}

export const deleteBlog=async(req,res,next)=>{
    const id=req.params.id;
    let blog;
    try{
     blog=await Blog.findByIdAndRemove(id).populate('user');
     await blog.user.blogs.pull(blog);
     await blog.user.save();
    }catch(err){
        console.log(err);
    }
    if(!blog){
        res.status(404).json({message:"unable to delete"});
    }
    res.status(202).json({message:"deleted successfully"});
}

export const getByUser=async(req,res,next)=>{
    const id =req.params.id;
    let userblog;
    try{
        userblog=await User.findById(id).populate('blogs');
    }catch(err){
        console.log(err);
    }

    if(!userblog){
        res.status(404).json({message:"no blogs found"});
    }
    res.status(200).json({userblog});
}
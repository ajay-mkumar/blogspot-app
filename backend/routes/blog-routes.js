import express from "express";
import { addBlog, deleteBlog, getAllblog, getById, getByUser, updateBlog } from "../controlers/blog-controller.js";

const blogrouter=express.Router();

blogrouter.get('/',getAllblog);
blogrouter.post('/addblog',addBlog);
blogrouter.put('/update/:id',updateBlog);
blogrouter.get('/:id',getById);
blogrouter.delete('/:id',deleteBlog);
blogrouter.get('/user/:id',getByUser);

export default blogrouter;
import mongoose, { Schema, mongo } from "mongoose";

const schema=mongoose.Schema;

const blogschema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
});

export default mongoose.model("Blog",blogschema);
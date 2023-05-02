import mongoose from "mongoose";

const schema=mongoose.Schema;

const userschema= new schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
   
    blogs:[{type:mongoose.Types.ObjectId,ref:"Blog"}]
});

export default mongoose.model("User",userschema);
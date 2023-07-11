import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        requried:true,
        default:false
    }
},{
    timestamps:true
})
UserSchema.methods.matchPassword=async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
}
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})
const User=mongoose.model("User",UserSchema);

export default User;
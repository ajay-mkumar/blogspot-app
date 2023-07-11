import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/config.js";
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./model/UserModel.js";
import Product from "./model/ProductModel.js";
import Order from "./model/OrderModel.js";

dotenv.config();

connectDB();

const importData=async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const create_user=await User.insertMany(users);
        const adminuser=create_user[0]._id;

        const sampleproducts=products.map(product=>{
           return{...product,user:adminuser};
        })

        await Product.insertMany(sampleproducts)

        console.log("data imported!")
        process.exit()
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}

const destory_data=async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("data destroyed!")
        process.exit()
    }catch(err){
        console.log(err)
        process.exit(1);
    }

}
if(process.argv[2]==='-d'){
    destory_data();
}else{
    importData();
}
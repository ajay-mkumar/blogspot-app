import { now } from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../model/OrderModel.js"

export const addOrderedItems=asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,
           itemPrice,taxPrice,shippingPrice,totalPrice}=req.body;
        

    if(orderItems && orderItems.length===0){
        res.status(404);
        throw new Error("No Order Items");
    }else{
        const order=new Order({
            
            orderItems: orderItems.map((x)=>({...x,product:x._id,_id:undefined } )),
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createorder=await order.save();

        res.status(201).json(createorder)
    } 
})

export const getMyOrders=asyncHandler(async(req,res)=>{
     const orders=await Order.find({user:req.user._id});
     res.status(200).json(orders)
})

export const getOrderById=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order);
    }else{
        res.status(400);
        throw new Error("can't find order")
    }
})

export const updateOrderToPaid=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);

    if(order){
        order.isPaid=true;
        order.PaidAt=Date.now();
        order.paymentresult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address,
        }

        const updateorder=await order.save();
        res.status(202).json(updateorder)
    }else{
        res.status(404)
        throw new Error("Order not Found")
    }
})
export const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);

    if(order){
        order.isDelivered=true;
        order.DeliveredAt=Date.now();

        const updateorder=await order.save();

        res.status(200).json(updateorder)
    }
})

export const getOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({}).populate('user','id name')
    res.status(200).json(orders)
})


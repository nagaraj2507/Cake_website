const express=require("express");
const order=require("../controllers/order");
const order_list=require("../controllers/order_list");
const delete_order=require("../controllers/deleteorder");
const jwt=require("jsonwebtoken");

const router=express.Router();

router.get("/",async(req,res)=>{
    const cakes=await order_list.fetch_orders(req,res);
    res.render("order",{layout:false,cakes:cakes});
});

router.post("/",async(req,res)=>{
    await order.insert_into_order(req,res);
    const cakes=await order_list.fetch_orders(req,res);
    res.render("order",{layout:false,cakes:cakes});
});

router.post("/delete",async(req,res)=>{
    await delete_order.delete_from_order(req,res);
    res.redirect("/order");
})

module.exports=router;
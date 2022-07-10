const express=require("express");
const cart=require("../controllers/cart");
const cart_list=require("../controllers/cart_list");
const deletecart=require("../controllers/deletecart");

const router=express.Router();

router.get("/",async(req,res)=>{
    const cakes=await cart_list.fetch_cart(req,res);
    res.render("cart",{layout:false,cakes:cakes});
})

router.post("/",async(req,res)=>{
    const submit=req.body.submit;
    if(submit=="deletecart"){
        await deletecart.delete_from_cart(req,res);
    }
    await cart.insert_into_cart(req,res);
    const cakes=await cart_list.fetch_cart(req,res);
    res.render("cart",{layout:false,cakes:cakes});
});


router.post("/delete",async(req,res)=>{
   
        await deletecart.delete_from_cart(req,res);
   
    
    const cakes=await cart_list.fetch_cart(req,res);
    res.redirect("/cart")
});


module.exports=router;
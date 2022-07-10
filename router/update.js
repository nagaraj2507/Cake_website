const express=require("express");
const update=require("../controllers/update");
const cakelist=require("../controllers/homepage");
const jwt=require("jsonwebtoken");
const e = require("express");

const router=express.Router();

router.get("/",async(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        res.render("login",{layout:false});
    }else{
        const verify=jwt.verify(token,'hihowareyouimfine');
        if(verify){
    const cakes=await cakelist.fetch_cakes(req,res);
    res.render("update",{layout:false,cakes:cakes});
        }else{
            res.render("login",{layout:false});
        }
    }
});

router.post("/",async(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        res.render("login",{layout:false});
    }else{
        const verify=jwt.verify(token,'hihowareyouimfine');
        if(verify){
    await update.update_quantity(req,res); 
    const cakes=await cakelist.fetch_cakes(req,res);
    res.render("update",{layout:false,cakes:cakes});
}else{
    res.render("login",{layout:false});
}
}
});

module.exports=router;
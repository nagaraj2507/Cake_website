const express=require("express");
const cakelist=require("../controllers/homepage");
const jwt=require("jsonwebtoken");

const router=express.Router();

router.get("/",async(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        res.render("login",{layout:false});
    }else{
        const verify=jwt.verify(token,'hihowareyouimfine');
        if(verify){
    const cakes=await cakelist.fetch_cakes(req,res);
    res.render("homepage1",{layout:false,cakes:cakes});
        }else{
            res.render("login",{layout:false});
        }
    }
});

module.exports=router;
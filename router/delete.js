const express=require("express");
const deletion=require("../controllers/delete");
const jwt=require("jsonwebtoken");
const router=express.Router();

router.get("/",async(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        res.render("login",{layout:false});
    }else{
        const verify=jwt.verify(token,'hihowareyouimfine');
        if(verify){
            res.render("delete",{layout:false});
        }else{
            res.render("login",{layout:false});
        }
    }
});

router.post("/",async(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        res.render("login",{layout:false});
    }
    else{
        const verify=jwt.verify(token,'hihowareyouimfine');
        if(verify){
    await deletion.delete_cake(req,res);
    res.render("delete",{layout:false});
        }else{
            res.render("login",{layout:false});
        }
    }
});

module.exports=router;
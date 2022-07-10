const express=require("express");
const add=require("../controllers/add");
const jwt=require("jsonwebtoken");

const router=express.Router();


router.get("/",(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        res.render("login",{layout:false});
    }else{
        const verify=jwt.verify(token,'hihowareyouimfine');
        console.log(verify);
        if(verify){
            res.render("add",{layout:false});
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
            console.log(verify);
    await add.add_cake(req,res);
    await add.upload_image(req,res);
    // const file=req.files.file;
    // const fileName=file.name;
    // console.log(fileName);
    res.render("add",{layout:false});
        }else{
            res.render("login",{layout:false});
        }
    }
});

module.exports=router;
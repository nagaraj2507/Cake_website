const express=require("express");
const {body}=require("express-validator");
const auth=require("../controllers/register");

const router=express.Router();

const registerValidator=[
     body("email")
     .exists()
     .isEmail()
     .notEmpty()
     .withMessage("Enter a valid email address"),

     body("password")
     .exists()
     .isAlphanumeric()
     .notEmpty()
     .isLength({min:6,max:20})
     .withMessage("Enter a valid password")
]

router.get("/",(req,res)=>{
     res.render("login");
});

router.post("/",registerValidator,(req,res)=>{
    auth.login(req,res);
});

router.get("/logout",(req,res)=>{
     // res.clearCookie("token");
     res.cookie('token','',{maxAge:1}); 
     console.log("Successfully logged out");
     res.render("login",{layout:false});
})


module.exports=router;
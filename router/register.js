const express=require("express");
const {body}=require("express-validator");
const auth = require("../controllers/register");
const router=express.Router();

const registerValidator=[
     body("email")
     .exists()
     .isEmail()
     .notEmpty()
     .withMessage("Enter a valid email address"),
     
     body("password")
     .exists()
     .notEmpty()
     .isLength({min:6,max:20})
     .isAlphanumeric()
     .withMessage("Please enter a valid password")
]

router.get("/",(req,res)=>{
     res.render("register");
});

router.post("/",registerValidator,(req,res)=>{
     auth.register(req,res);
})

module.exports=router;
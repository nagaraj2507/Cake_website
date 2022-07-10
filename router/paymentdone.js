const express=require("express");
const updatepayment=require("../controllers/pay1");
const router=express.Router();

router.post("/",async(req,res)=>{
    await updatepayment.update_payments(req,res);
    res.render("pay3",{layout:false});
});

module.exports=router;
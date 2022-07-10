const express=require("express");
const total=require("../controllers/pay1");

const router=express.Router();


router.post("/",async(req,res)=>{
    const tprice=await total.totalprice(req,res);
    const name1=await total.cust_name(req,res);
    const price=await tprice[0].price;
    const name=await name1[0].name;
    // console.log(name,price);
    res.render("pay1",{layout:false,name:name,price:price});
});

module.exports=router;


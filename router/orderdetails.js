const express=require("express");
const orderlist=require("../controllers/order_list");
const delete_order=require("../controllers/managerdeleteorder");
const jwt=require("jsonwebtoken");

const router=express.Router();

router.get("/",async(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        res.render("login",{layout:false});
    }else{
        const verify=jwt.verify(token,"hihowareyouimfine");
        if(verify){
        const orders=await orderlist.fetch_detailorder(req,res);
    res.render("orderdetails",{layout:false,order:orders});
        }else{
            res.render("login",{layout:false});
        }
    }
});

router.post("/delete",async(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        res.render("login",{layout:false});
    }else{
        const verify=jwt.verify(token,"hihowareyouimfine");
        if(verify){
    const {cname,orderid,email,payed}=req.body;
    console.log(cname,orderid,email,payed);
    await delete_order.delete_from_order(req,res);
    res.redirect("/orderdetails");
}else{
    res.render("login",{layout:false});
}
}
});

module.exports=router;
const jwt=require("jsonwebtoken");
const pool=require("../utils/dbconfig");

module.exports.delete_from_cart=async(req,res)=>{
    let token=req.cookies.token;
    if(!token){
        res.status(403).json();
        return;
    }else{
    let result=jwt.verify(token,"hihowareyouimfine");
    req.body.email=result.email;
    const {cname,cartid,email}=req.body;
    console.log(cname,cartid,email);
    await pool.query("delete from Cart where cartid=$1",[cartid]);
    }
};
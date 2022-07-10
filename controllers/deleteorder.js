const jwt=require("jsonwebtoken");
const pool=require("../utils/dbconfig");

module.exports.delete_from_order=async(req,res)=>{
    let token=req.cookies.token;
    if(!token){
        res.status(403).json();
        return;
    }else{
    let result=jwt.verify(token,"hihowareyouimfine");
    req.body.email=result.email;
    const {cname,orderid,email,payed}=req.body;
    console.log(cname,orderid,email,payed);
    var pay="n";
    await pool.query("delete from order13 where orderid=$1 and payed=$2",[orderid,pay]);
    }
};
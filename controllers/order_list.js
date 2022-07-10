const jwt=require("jsonwebtoken");
const pool=require("../utils/dbconfig");

module.exports.fetch_orders=async (req,res)=>{
    let token=req.cookies.token;
    if(!token){
        res.status(304).json();
        return;
    }else{
    let result=jwt.verify(token,"hihowareyouimfine");
    if(result){
    req.body.email=result.email;
    const email=req.body.email;
    const cakes=await pool.query("select * from order13 where email=$1",[email]);
    return cakes.rows;
    }else{
        res.status(403).json();
    }
    }
}

module.exports.fetch_detailorder=async (req,res)=>{
    const cakes=await pool.query("select * from order13 ");
    return cakes.rows;
}
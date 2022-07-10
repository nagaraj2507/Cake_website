const jwt=require("jsonwebtoken");
const pool=require("../utils/dbconfig");

module.exports.fetch_cart=async(req,res)=>{
    let token=req.cookies.token;
    console.log(token);
    if(!token){
        res.status(403).json();
        return;
    }else{
    let result=jwt.verify(token,"hihowareyouimfine");
    if(result){
    req.body.email=result.email;
    const email=req.body.email;
    const cakes=await pool.query("select * from Cart where email=$1",[email]);
    return cakes.rows;
    }else{
        res.status(403).json();
    }
}
};
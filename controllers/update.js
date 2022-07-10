const pool=require("../utils/dbconfig");
const jwt=require("jsonwebtoken");

module.exports.update_quantity=async(req,res)=>{
    const {cname,qty}=req.body;
    await pool.query("update Cake set qty=$1 where cname=$2",[qty,cname]);
};

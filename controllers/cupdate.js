const pool=require("../utils/dbconfig");
const jwt=require("jsonwebtoken");

module.exports.update_cost=async(req,res)=>{
    const {cname,cost}=req.body;
    await pool.query("update Cake set cost=$1 where cname=$2",[cost,cname]);
}
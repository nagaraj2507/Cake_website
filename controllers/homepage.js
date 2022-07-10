const pool=require("../utils/dbconfig.js");
const jwt=require("jsonwebtoken");

module.exports.fetch_cakes=async(req,res)=>{
    const cakes=await pool.query("select * from Cake");
    // console.log(cakes);
    return cakes.rows;
}
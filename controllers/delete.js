const pool=require("../utils/dbconfig");
const fs=require("fs");
const jwt=require("jsonwebtoken");

module.exports.delete_cake=async(req,res)=>{
    const {cname}=req.body;
    // var name1=name.name;
    console.log(cname);
    await pool.query("delete from Cake where cname=$1",[cname]);
        try{
            var name2=cname+".jpg";
            fs.unlink("../Cake_website/public/images/"+name2,(err)=>{
                console.log(err);
            });
        }catch(err){
            console.log("Error while detecting the file"+err);                       //if we are trying to delete a not existing file
        }
};

module.exports.fetch_cakes=async(req,res)=>{
    const cakes=await pool.query("select * from Cake");
    return cakes.rows;
}
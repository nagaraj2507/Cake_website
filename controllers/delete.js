const pool=require("../utils/dbconfig");
const fs=require("fs");
const jwt=require("jsonwebtoken");

module.exports.delete_cake=async(req,res)=>{
    const name=req.body;
    var name1=name.name;
    await pool.query("delete from Cake where cname=$1",[name1]);
        try{
            var name2=name1+".jpg";
            fs.unlink("../Cake_website/public/images/"+name2,(err)=>{
                console.log(err);
            });
        }catch(err){
            console.log("Error while detecting the file"+err);                       //if we are trying to delete a not existing file
        }
};
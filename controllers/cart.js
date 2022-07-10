const jwt=require("jsonwebtoken");
const pool=require("../utils/dbconfig");

const insert_into_cart=async(req,res)=>{
    let token=req.cookies.token;
    console.log(token);
    if(!token){
        res.status(403).json();
        return;
    }else{
    let result=jwt.verify(token,"hihowareyouimfine");
    if(result){
    req.body.email=result.email;
    const {cid,cname,flavour,type,weight,cost,cquantity,oquantity,email}=req.body;
    console.log(cid,cname,flavour,type,weight,cost,cquantity,oquantity,email);
    console.log(cost,flavour,cid,email,cname,oquantity,type);
    await pool.query("insert into Cart(price,flavour,cid,email,cname,qty,type) values($1,$2,$3,$4,$5,$6,$7)",[cost,flavour,cid,email,cname,oquantity,type]);
    }else{
        res.status(403).json();
    }
    }
};

const delete_from_cart=async (req,res)=>{
    let token=req.cookies.token;
    if(!token){
        res.status(403).json();
        res.render("/");
    }else{
    const {cname,cartid,email}=req.body;
    console.log(cname,cartid,email);
    // await pool.query("delete from Cart where cname=$1 and cartid=$2 and email=$3",[cname,cartid,email]);
    await pool.query("delete from Cart where cartid=$1",[cartid]);
    }
}

module.exports={insert_into_cart,delete_from_cart};
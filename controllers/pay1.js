const pool=require("../utils/dbconfig");
const jwt=require("jsonwebtoken");

module.exports.totalprice=async (req,res)=>{
    let token=req.cookies.token;
    if(!token){
        res.status(403).json();
        return;
    }else{
    let result=jwt.verify(token,"hihowareyouimfine");
    if(result){
    req.body.email=result.email;
    const email=req.body.email;
    const payed='n';
    const totprice=await pool.query('select SUM("totprice") AS price from order13 group by (email,payed) having email=$1 and payed=$2',[email,payed]);
    console.log(totprice.rows);
    return totprice.rows;
    }else{
        res.status(403).json();
    }
    }
};

module.exports.cust_name=async (req,res)=>{
    let token=req.cookies.token;
    if(!token){
        res.status(403).json();
        return;
    }else{
    let result=jwt.verify(token,"hihowareyouimfine");
    req.body.email=result.email;
    const email=req.body.email;
    const name=await pool.query("select name from user13 where email=$1",[email]);
    console.log(name.rows);
    return name.rows;
    }
};

module.exports.update_payments=async(req,res)=>{
    let token=req.cookies.token;
    if(!token){
        res.status(403).json();
        return;
    }else{
        let result=jwt.verify(token,"hihowareyouimfine");
        req.body.email=result.email;
        const email=req.body.email;
        const payed='p';
        const name=await pool.query("update order13 set payed=$1 where email=$2",[payed,email]);
    }
}




// should use group by when we use aggregate functions with conditions
//this query will return null as output
//select SUM("price") from order13 where email="nagaraj@gmail.com" and payed='n';
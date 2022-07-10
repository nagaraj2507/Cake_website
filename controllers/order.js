const jwt=require("jsonwebtoken");
const pool=require("../utils/dbconfig");

module.exports.insert_into_order=async (req,res)=>{
    let token=req.cookies.token;
    console.log(token);
    if(!token){
        res.status(403).json();
        return;
    }else{
    let result=jwt.verify(token,"hihowareyouimfine");
    if(result){
    req.body.email=result.email;
    const {cname,flavour,type,qty,price,cid,email}=req.body;
    const user=await pool.query("select * from user13 where email=$1",[email]);
    console.log(user.rows);
    const name=user.rows[0].name;
    const phoneno=user.rows[0].contactno;
    const totprice=qty*price;
    await pool.query("insert into order13(email,cid,price,oqty,cname,totprice,name,contactno) values($1,$2,$3,$4,$5,$6,$7,$8)",[email,cid,price,qty,cname,totprice,name,phoneno]);
    }else{
        res.status(403).json();
    }
    }
};



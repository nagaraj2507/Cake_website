const pool=require("../utils/dbconfig");
const bcrypt=require("bcryptjs");
const {validationResult}=require("express-validator");
const JWT=require("jsonwebtoken");


async function register(req,res) {
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            console.log("222",errors.array())
            res.status(400).json({errors:errors.array()[1].msg});                       //400 means bad request
            return;
        }
        console.log(req.body);
        const {typeofuser,name,password,cpassword,contactno,email,address,scode}=req.body;
        // console.log(typeofuser,name,password,cpassword,contactno,email,address,scode);
        const check_if_user_exists=await pool.query("select * from user13 where email=$1",[email]);
        if(check_if_user_exists.rowCount!=0){
            res.status(404).json("Account already exists");
            return;
        }
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt);
        if(typeofuser=="Customer"){
            var n=await pool.query("select * from User13 where typeofuser=$1",[typeofuser]);
            console.log(n.rowCount);
            n=n.rowCount+1;
            const userid1="c"+n;
            const user_register=await pool.query("insert into User13(userid,name,email,contactno,typeofuser,address,password) values($1,$2,$3,$4,$5,$6,$7)",[userid1,name,email,contactno,typeofuser,address,hash]);
            res.status(201).json({
                user:'1'
            });
        }
        else if(typeofuser=="Manager" && scode=="n123"){
            var n=await pool.query("select * from User13 where typeofuser=$1",[typeofuser]);
            console.log(n.rowCount);
            n=n.rowCount+1;
            const userid1="m"+n;
            const user_register=await pool.query("insert into User13(userid,name,email,contactno,typeofuser,address,password) values($1,$2,$3,$4,$5,$6,$7)",[userid1,name,email,contactno,typeofuser,address,hash]);
            res.status(201).json({
                user:'1'
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:'Invalid values'
            
        });
    }
}

async function login(req,res){
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            console.log("222",errors.array());
            return res.status(400).json({errors:errors.array()[1].msg});
        }
        const {typeofuser,email,password}=req.body;
        console.log(typeofuser,email,password);
        const check_if_user_exists=await pool.query("select email from User13 where email=$1 and typeofuser=$2",[email,typeofuser]);
        if(check_if_user_exists.rowCount!=0){
            const hash_password=await pool.query("select password from User13 where email=$1 and typeofuser=$2",[email,typeofuser]);
            const hash_password_string=hash_password.rows[0].password;
            const validPassword=await bcrypt.compare(password,hash_password_string);
            const token=await JWT.sign({
               email:email 
            },'hihowareyouimfine');

            console.log(token);
            if(!validPassword){
                res.status(400).json("Email or password incorrect");
                return;
            }else{
                res.cookie('token',token,{
                    maxAge:3600000,
                    httpOnly:true
                    // path:"/"
                })
                res.status(201).json({
                    user:'1'
                });
            }
        }
        else{
            res.status(400).json({errors:"Email not registered."});
            return;
        }
    }catch(e){
        res.status(500).json({
            errors:'Invalid email or password'
        });
    }
}

module.exports = {register,login};


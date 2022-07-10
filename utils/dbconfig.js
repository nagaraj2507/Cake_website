require('dotenv').config()
const { Pool }=require("pg");

const config={
    host:process.env.HOST,
    port:process.env.DPORT,
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD,
};

const pool=new Pool(config);
module.exports=pool;
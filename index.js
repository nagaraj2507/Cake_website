require('dotenv').config()
const express=require("express");
var fileupload = require("express-fileupload");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");

const homepage=require("./router/homepage");
const homepage1=require("./router/homepage1");
const login=require("./router/login");
const register=require("./router/register");
const details=require("./router/details");
const cart=require("./router/cart");
const order=require("./router/order");
const add=require("./router/add");
const deletion=require("./router/delete");
const update=require("./router/update");
const cupdate=require("./router/cupdate");
const pay1=require("./router/pay1");
const pay3=require("./router/paymentdone");
const orderdetails=require("./router/orderdetails");
const app=express();

const port = process.env.PORT|3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public/images'));    //to say we are using static 
app.use(fileupload());

app.set("view engine","ejs");

app.use("/homepage",homepage);
app.use("/details",details);
app.use("/",login);
app.use("/register",register);
app.use("/homepage1",homepage1);
app.use("/cart",cart);
app.use("/order",order);
app.use("/add",add);
app.use("/delete",deletion);
app.use("/update",update);
app.use("/cupdate",cupdate);
app.use("/pay1",pay1);
app.use("/pay3",pay3);
app.use("/orderdetails",orderdetails);

app.get("/pay2",(req,res)=>{
     const token=req.cookies.token;
     if(!token){
          res.render("login",{layout:false});
     }
     else{
          const verify=jwt.verify(token,"hihowareyouimfine");
          if(verify){
     res.render("pay2",{layout:false});
          }else{
               res.render("login",{layout:false});
          }
     }
});

app.listen(port,function(req,res){
     console.log("Server started on port 3000");
});
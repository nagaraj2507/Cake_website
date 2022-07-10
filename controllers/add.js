const pool=require("../utils/dbconfig");
 

async function add_cake(req,res){
    const {name,flavour,type,weight,cost,qty}=req.body;
        // console.log(name,flavour,type,weight,cost,qty);
        await pool.query("insert into cake(flavour,cname,type,weight,cost,qty) values($1,$2,$3,$4,$5,$6)",[flavour,name,type,weight,cost,qty]);
};

function upload_image(req,res){
        var file;
       file = req.files.file;
       const {name,flavour,type,weight,cost,qty}=req.body;
       console.log(name,flavour,type,weight,cost,qty);
        var filename=file.name;
        var filename1=name;
        fs.rename(filename,filename1,(err)=>{
            console.log(err);
        });

        file.mv("../Cake_website/public/images/"+filename1+".jpg",(err)=>{                                        //file.mv() to move file to destination
               if(err){
                   console.log(err);
               }
            });
};

module.exports={add_cake,upload_image};
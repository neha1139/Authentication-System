const mysql=require("mysql2");

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"authentication_system"
});

db.connect((err)=>{
    if(err){
       throw err;
    }else{
        console.log("connected to MYSQL successfully!");
    }
});

module.exports=db;
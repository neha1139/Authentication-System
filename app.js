const db = require("./database/connection");
const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
//Middleware that parses incoming JSON data from the request body and converts it into a JavaScript object, allowing access through req.body.
app.use(express.json());
const path=require("path");
app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"public","index.html"));
});

app.post("/register",(req,res)=>{
   
   console.log(req.body);
   const{username,email,password}=req.body;
   const checkEmailQuery="SELECT * FROM users WHERE email=?";
   db.query(checkEmailQuery,[email],(err,result)=>{
      if(err){
         console.log(err);
         return res.status(500).json({
            success:false,
            message:"Database Error"
         });
      }
      if(result.length>0){
         return res.status(400).json({
             message: "Email already exists."
         });
      }
      //The 10 is called the salt rounds...
      bcrypt.hash(password,10,(err,hashedPassword)=>{
             if(err){
               console.log(err);
               return res.status(500).json({
                success:false,
                message:"Error while hashing password"
               });
             }
             const insertQuery=`INSERT into users(username,email,password) 
            VALUES(?,?,?)`;
            db.query(insertQuery,[username,email,hashedPassword],(err,result)=>{
               if(err){
                  console.log(err);
                  return res.status(500).json({
                  success:false,
                  message:"Failed to register user"
                  });
      }
      res.json({
         success:true,
         message:"User added successfully"
      });
   });
        });
    
});
   });

   

   app.post("/login",(req,res)=>{
      const{email,password}=req.body;
      const findUserQuery=`SELECT *  FROM users WHERE email=? ;`
      db.query(findUserQuery,[email],(err,result)=>{
         if(err){
           console.log(err);
           return res.status(500).json({
              success:false,
              message:"Database Error"
         });     
         }
         if(result.length===0){
             return res.status(404).json({
                success: false,
                message: "User not found."
              }); 
         }
         const hashedPassword=result[0].password;
         bcrypt.compare(password,hashedPassword,(err,isMatch)=>{
            if(err){
               console.log(err);
               return res.status(500).json({
                  success:false,
                  message:"Error while verifying password."
               });
            }
            if(!isMatch){
               return res.status(401).json({
                  success:false,
                  message:"Invalid email or password."
               });
            }
            res.json({
               success:true,
               message:"Login successful."
            })
            
         });
      });
   });


app.listen(3000,()=>{
   console.log("Server is running on port 3000"); 
})
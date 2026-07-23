const db = require("./database/connection");
const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
//Middleware that parses incoming JSON data from the request body and converts it into a JavaScript object, allowing access through req.body.
app.use(express.json());
const path=require("path");
app.use(express.static(path.join(__dirname,"public")));
const session = require("express-session");

app.use(session({
   secret:"mySecretKey",
   resave:false,
   saveUninitialized:false
}));

function isAuthenticated(req,res,next){
   if(req.session.user){
      next();
   }else{
            return res.status(401).json({
            success: false,
            message: "Please login first."
        });
   }
}


app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"public","index.html"));
});

app.post("/register",(req,res)=>{
   const{username,email,password}=req.body;
   const checkEmailQuery="SELECT * FROM users WHERE email=?";
    if (username.trim() === "") {
            return res.status(400).json({
            success: false,
            message: "Username cannot be empty."
            });
         }
         if(email.trim()===""){
         return res.status(400).json({
         success: false,
         message: "Email cannot be empty."
            });
          }
         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailPattern.test(email)) {
            return res.status(400).json({
             success: false,
            message: "Please enter a valid email address."
            });
         } 
          if(password.trim()===""){
            return res.status(400).json({
            success: false,
            message: "Password cannot be empty."
            });
         }
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
            success:false,
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
         message:"Registration successful"
      });
   });
        });
    
});
   });

   

   app.post("/login",(req,res)=>{
      const{email,password}=req.body;
      const findUserQuery=`SELECT *  FROM users WHERE email=?`;
         if(email.trim()===""){
         return res.status(400).json({
         success: false,
         message: "Email cannot be empty."
            });
          }
         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailPattern.test(email)) {
            return res.status(400).json({
             success: false,
            message: "Please enter a valid email address."
            });
         } 
         if(password.trim()===""){
            return res.status(400).json({
            success: false,
            message: "Password cannot be empty."
            });
         }
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
           
            req.session.user={
             id:result[0].id,
             username:result[0].username
            };
             res.json({
               success:true,
               message:"Login successful."
            });
         });
         
      });
   });

     

   app.get("/dashboard",isAuthenticated,(req,res)=>{
           res.sendFile(path.join(__dirname,"public","dashboard.html"));
   });




app.get("/user",isAuthenticated,(req,res)=>{
    const userId=req.session.user.id;
    const sql=`SELECT username, email
          FROM users
         WHERE id = ?`;

        db.query(sql, [userId], (err, result) => {
         if (err) {
            console.log(err);
            return res.status(500).json({
            success: false,
            message: "Failed to fetch details."
        });
    }
     res.json(result[0]);
});
});


   app.post("/logout",(req,res)=>{
     req.session.destroy(err=>{
      if(err){
            console.log(err);
            return res.status(500).json({
               success:false,
               message:" Logout failed"
            });
      }
      res.status(200).json({
         success:true,
         message:"Logout successful"
       
      });
     });
   });


   app.put("/profile",isAuthenticated,(req,res)=>{
      const userId=req.session.user.id;
      const {username,email}=req.body;
         if (username.trim() === "") {
            return res.status(400).json({
            success: false,
            message: "Username cannot be empty."
            });
         }
         if(email.trim()===""){
         return res.status(400).json({
         success: false,
         message: "Email cannot be empty."
            });
          }
         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailPattern.test(email)) {
            return res.status(400).json({
             success: false,
            message: "Please enter a valid email address."
            });
         } 


      const checkEmailQuery=`SELECT * FROM users
      WHERE email=? AND id!=?`;
      db.query(checkEmailQuery,[email,userId],(err,result)=>{
         if(err){
            console.log(err);
            return res.status(500).json({
               success:false,
               message:"error occured"
            })
         }
         if(result.length>0){
           return res.status(400).json({
           success: false,
          message: "Email already exists"
            });
         }
       
         const updateProfileQuery =`UPDATE users 
         SET username=?,email=?
         WHERE id=?`
         db.query(updateProfileQuery ,[username,email,userId],(err,result)=>{
            if(err){
               console.log(err);
               return res.status(500).json({
                  success:false,
                  message:"Failed to update user"
               });
            }
            req.session.user.username=username;
            
            return res.json({
               success:true,
               message:"User updated successfully"
            });
         });
        
        
      });
         });
     
   
app.put("/change-password",isAuthenticated,(req,res)=>{
const userId=req.session.user.id;
const {currentPassword,newPassword,confirmPassword}=req.body;
if(currentPassword.trim()===""){
   return res.status(400).json({
    success: false,
    message: "Current password cannot be empty"
});
}
if(newPassword.trim()===""){
   return res.status(400).json({
    success: false,
    message: "Enter the new passsword"
});
}
if(confirmPassword.trim()===""){
   return res.status(400).json({
    success: false,
    message: "Enter the confirm password"
});
}
if(newPassword!==confirmPassword){
   return res.status(400).json({
    success: false,
    message: "Password does not match!"
});
}
if(newPassword.length<8){
   return res.status(400).json({
    success: false,
    message: "Password should be of minimum 8 characters"
});
}
const checkPasswordQuery=`SELECT password FROM users WHERE id=?`;
db.query(checkPasswordQuery,[userId],(err,result)=>{
   if(err){
      console.log(err);
      return res.status(500).json({
         success:false,
         message:"Database error occured"
      });
   }
   if(result.length==0){
      return res.status(404).json({
      success: false,
      message: "User not found."
});
   }
   bcrypt.compare(currentPassword,result[0].password,(err,isMatch)=>{
  if(err){
   console.log(err);
   return res.status(500).json({
      success:false,
      message:"Error occured while verifying password"
   });
  }
  if(!isMatch){
   return res.status(401).json({
    success: false,
    message: "Current password is incorrect."
});
  }
   bcrypt.hash(newPassword,10,(err,hashedPassword)=>{
         if (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error while hashing password."
        });
    }
     const updatePasswordQuery=`UPDATE users 
     SET password=? WHERE id=?`;
     db.query(updatePasswordQuery,[hashedPassword,userId],(err,result)=>{
        if(err){
         console.log(err);
         return res.status(500).json({
            success:false,
            message:"Failed to update password"
         });
        }
       return res.json({
       success: true,
       message: "Password updated successfully."
});  
     });
   });
  
   });
});
});



app.listen(3000,()=>{
   console.log("Server is running on port 3000"); 
})
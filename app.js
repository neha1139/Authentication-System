const express=require("express");
const app=express();
//Middleware that parses incoming JSON data from the request body and converts it into a JavaScript object, allowing access through req.body.
app.use(express.json());
const path=require("path");
app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"public","index.html"));
});


app.listen(3000,()=>{
   console.log("Server is running on port 3000"); 
})
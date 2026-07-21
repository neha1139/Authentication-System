 
 

 document.addEventListener("DOMContentLoaded", async function(){
    const response=await fetch("/user");
    const data=await response.json();
    document.getElementById("username").innerText = data.username;
    document.getElementById("email").innerText=data.email;    
 });

  
 
const btn=document.getElementById("logoutBtn");
btn.addEventListener("click",async function(){
   const response=await fetch("/logout",{
      method:"POST"
   });
   const data=await response.json();
   if(data.success){
window.location.href="/login.html";
   }
});

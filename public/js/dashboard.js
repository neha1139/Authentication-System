 
 

 document.addEventListener("DOMContentLoaded", async function(){
    const response=await fetch("/user");
    const data=await response.json();
    document.getElementById("usernameText").innerText = data.username;
    document.getElementById("emailText").innerText=data.email;    
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

const usernameText = document.getElementById("usernameText");
const emailText = document.getElementById("emailText");

const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");


const editBtn=document.getElementById("editBtn");
editBtn.addEventListener("click",function(){
   document.getElementById("usernameInput").value=document.getElementById("usernameText").innerText;
    document.getElementById("emailInput").value=document.getElementById("emailText").innerText;

      // Hide text
    document.getElementById("usernameText").classList.add("d-none");
    document.getElementById("emailText").classList.add("d-none");

      // Show inputs
    document.getElementById("usernameInput").classList.remove("d-none");
    document.getElementById("emailInput").classList.remove("d-none");
    
    
      // Buttons
    document.getElementById("editBtn").classList.add("d-none");
    document.getElementById("saveBtn").classList.remove("d-none");
    document.getElementById("cancelBtn").classList.remove("d-none");
})

const saveBtn=document.getElementById("saveBtn");
saveBtn.addEventListener("click",async function(){
const username = document.getElementById("usernameInput").value;
const email = document.getElementById("emailInput").value;

if (username.trim() === "") {
    alert("Username  cannot be empty.");
    return;
}

if(email.trim()===""){
   alert("Email cannot be empty");
   return;
}

const emailPattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if(!emailPattern.test(email)){
    alert("Please enter a valid email address.");
    return;
    }



const response=await fetch("/profile",{
  method:"PUT",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   username,
   email
  })
});
const data=await response.json();
if(data.success){
   usernameText.innerText = username;
   emailText.innerText = email;
   usernameInput.classList.add("d-none");
   emailInput.classList.add("d-none");
   usernameText.classList.remove("d-none");
   emailText.classList.remove("d-none");
   editBtn.classList.remove("d-none");
   saveBtn.classList.add("d-none");
   cancelBtn.classList.add("d-none");
   alert(data.message);
}else{
   alert(data.message);
}
});


const cancelBtn=document.getElementById("cancelBtn");
cancelBtn.addEventListener("click",function(){
   usernameInput.classList.add("d-none");
   emailInput.classList.add("d-none");
   usernameText.classList.remove("d-none");
   emailText.classList.remove("d-none");
   editBtn.classList.remove("d-none");
   saveBtn.classList.add("d-none");
   cancelBtn.classList.add("d-none");  
});


const changePasswordBtn=document.getElementById("changePasswordBtn");
const passwordSection=document.getElementById("passwordSection");
const cancelPasswordBtn=document.getElementById("cancelPasswordBtn");
const updatePasswordBtn = document.getElementById("updatePasswordBtn");

changePasswordBtn.addEventListener("click",function(){
passwordSection.classList.remove("d-none");
changePasswordBtn.classList.add("d-none");
});



cancelPasswordBtn.addEventListener("click",function(){
passwordSection.classList.add("d-none");
changePasswordBtn.classList.remove("d-none");
document.getElementById("currentPassword").value = "";
document.getElementById("newPassword").value = "";
document.getElementById("confirmPassword").value = "";
});

updatePasswordBtn.addEventListener("click",async function(){
const currentPassword = document.getElementById("currentPassword").value;
const newPassword = document.getElementById("newPassword").value;
const confirmPassword = document.getElementById("confirmPassword").value;

if(currentPassword.trim()===""){
   alert("Current password cannot be empty");
   return;
}
if(newPassword.trim()===""){
  alert("Enter the password to change");
  return;
}
if(confirmPassword.trim()===""){
   alert("Enter the confirm password");
   return;
}
if(newPassword!==confirmPassword){
   alert("Password does not match! ");
   return;
}
if(newPassword.length<8){
   alert("Password cannot be les than 8 characters");
   return;
}

const response=await fetch("/change-password",{
   method:"PUT",
   headers:{
       "Content-Type": "application/json"
   },
   body:JSON.stringify({
      currentPassword,
    newPassword,
    confirmPassword 
   })
});
const data=await response.json();
if(data.success){
   alert(data.message);
   document.getElementById("currentPassword").value = "";
   document.getElementById("newPassword").value = "";
   document.getElementById("confirmPassword").value = "";
   passwordSection.classList.add("d-none");
   changePasswordBtn.classList.remove("d-none");
}else{
   alert(data.message);
}
});
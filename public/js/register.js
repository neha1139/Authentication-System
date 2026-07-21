const registerForm=document.getElementById("registerForm");
registerForm.addEventListener("submit",function(event){
    event.preventDefault();

    const username=document.getElementById("username").value.trim();
    const email=document.getElementById("email").value.trim();
    const password=document.getElementById("password").value;
    const confirmPassword=document.getElementById("confirmPassword").value;


    if(username===""||
        email===""||
        password===""||
        confirmPassword===""
    ){
        alert("Please fill all the fields.");
        return;
    }


    const emailPattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        alert("Please enter a valid email address.");
        return;
    }


    if(password.length<8){
         alert("Password must be at least 8 characters long.");
        return;
    }

    if(password!==confirmPassword){
        alert("Passwords do not match.");
        return;
    }

    fetch("/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,email,password
        })
    })
    .then(async(response)=>{
        const data=await response.json();
        alert(data.message);
        if(response.ok){
          window.location.href = "login.html";
        }
    })
    .catch(error=>{
        console.log(error);
    });
});
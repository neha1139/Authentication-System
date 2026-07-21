

const loginForm=document.getElementById("loginForm");
loginForm.addEventListener("submit",function(event){
    event.preventDefault();
    const email=document.getElementById("email").value.trim();
    const password=document.getElementById("password").value;


if(email==""||password===""){
    alert("Fill all the fields");
    return;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
}

fetch("/login",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        email,password
    })
})
    .then(async(response)=>{
         const data=await response.json();
        alert(data.message);
        if(response.ok){
            window.location.href="/dashboard";
        }
    })
    .catch(error=>{
        console.log(error);
    });
});

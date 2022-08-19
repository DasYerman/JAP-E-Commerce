//My code
 
let login = document.getElementById("login-form")
let username = document.getElementById("username")
let password = document.getElementById("password")

login.addEventListener('submit', function(event){   

    if(username.value == "" | password.value == ""){
        event.preventDefault();
        let user = document.getElementById("username");
        user.style.border = "1px red solid";
        let pass = document.getElementById("password");
        pass.style.border = "1px red solid"
        let error = document.getElementById("p-error-text")
        error.style.display = "block"
   
    }else{
        localStorage.setItem("user", username.value);
        localStorage.setItem("pass", password.value);
        event.preventDefault();
        window.location.href = 'index.html'    
    }

})



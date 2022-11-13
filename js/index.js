
function logOut(){
    localStorage.removeItem("user")
    localStorage.removeItem("pass")
} 

document.addEventListener("DOMContentLoaded", function(){

    let user = localStorage.getItem("user");
    let password = localStorage.getItem("pass");

    if(user == null | password == null){
        alert("No hay datos de sesión ingresados");
        location.href = "login.html"
    };

    let email = document.getElementById("user-email")
    email.innerText=user;

    document.getElementById("log-out").addEventListener("click",function(){
        logOut();
    })

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});
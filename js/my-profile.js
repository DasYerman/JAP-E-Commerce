let user = localStorage.getItem("user");
let email = document.getElementById("user-email");
email.innerText = user;

let emailInput = document.getElementById("e-mail-user");
emailInput.value = user;

let profilePic = localStorage.getItem("image")
let userImage = document.getElementById("cover-preview");
userImage.src = profilePic;


let storageName = localStorage.getItem("userName");
let nameUser = document.getElementById("first-name");
nameUser.value = storageName;

let storageSurname = localStorage.getItem("surName");
let surUser = document.getElementById("first-surname");
surUser.value = storageSurname;

let storageSecondName = localStorage.getItem("userSecondName");
let strSecName = document.getElementById("second-name");
strSecName.value = storageSecondName;

let storageSecondSurname = localStorage.getItem("userSecondSurname");
let strSecSur = document.getElementById("second-surname");
strSecSur.value = storageSecondSurname;

let storagePhone = localStorage.getItem("userPhone");
let usrPhone = document.getElementById("contact-phone");
usrPhone.value = storagePhone;


function nonRequired(){
  if(document.getElementById("second-name")|| document.getElementById("second-surname")|| document.getElementById("contact-phone")){
    let userSecondName = document.getElementById("second-name")
    localStorage.setItem("userSecondName", userSecondName.value)
    let userSecondSurname = document.getElementById("second-surname")
    localStorage.setItem("userSecondSurname", userSecondSurname.value)
    let userPhone = document.getElementById("contact-phone")
    localStorage.setItem("userPhone", userPhone.value)
  }
}

(() => {

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        let userName = document.getElementById("first-name")
        localStorage.setItem("userName", userName.value)

        let surName = document.getElementById("first-surname")
        localStorage.setItem("surName", surName.value)

        let user = document.getElementById("e-mail-user")
        localStorage.setItem("user", user.value)
        nonRequired()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();

let coverPreview = document.getElementById('cover-preview');
let cover = document.getElementById('cover');

coverPreview.addEventListener('click', ()=>cover.click());

cover.addEventListener("change",_=>{
    let file = cover.files[0];
    let reader = new FileReader();
    reader.onload = function (){
        coverPreview.src = reader.result;
        localStorage.setItem("image", coverPreview.src)
    }
    reader.readAsDataURL(file);
});
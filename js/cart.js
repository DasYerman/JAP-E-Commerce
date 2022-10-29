let email = document.getElementById("user-email")
let user = localStorage.getItem("user");
email.innerText = user;
let url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let table = document.getElementById("cart-table");
let cartArticles = []
let percentage = 0
let perTotal = 0
let cardPayment = document.getElementById("payment-card");
let cardFieldset = document.getElementById("card-fieldset");
let bankPayment = document.getElementById("payment-bank");
let bankFieldset = document.getElementById("bank-fieldset");



let op1 = document.getElementById("opcion-de-envio1")
op1.addEventListener("click", () => {
    percentage = 15
});

let op2 = document.getElementById("opcion-de-envio2")
op2.addEventListener("click", () => {
    percentage = 7
});

let op3 = document.getElementById("opcion-de-envio3")
op3.addEventListener("click", () => {
    percentage = 5
});

fetch(url)
    .then(res => res.json())
    .then(data => {
        let cartArticles = data.articles
        for (let i = 0; i < cartArticles.length; i++) {
            let cartProd = ""
            cartProd +=
                `
            <td class="td"><img class="table-img"src=${cartArticles[i].image}></td>
            <td class="td">${cartArticles[i].name}</td>
            <td class="td">${cartArticles[i].currency} ${cartArticles[i].unitCost}</td>
            <td class="td"><input class="table-number form-control"type="number" id="table-number" placeholder="o"></td> 
            <td class="td" id="${cartArticles[i].id}"><b>${cartArticles[i].currency}</b></td>           
        `
            table.innerHTML += cartProd

            document.getElementById("table-number").addEventListener("input", function () {
                let total = document.getElementById(cartArticles[i].id)
                let inputValue = document.getElementById("table-number").value
                let x = inputValue * cartArticles[i].unitCost
                total.innerHTML = `<b>${cartArticles[i].currency} ${x}</b>`

                let costContainer = document.getElementById("total-div")
                costContainer.innerHTML = `${cartArticles[i].currency} ${x}`

                let percentageTotal = document.getElementById("deliver-total")
                percentageTotal.innerHTML = `${cartArticles[i].currency} ${percentage * x / 100}`

                let fullTotal = document.getElementById("final-total")
                fullTotal.innerHTML = `<b>${cartArticles[i].currency} ${(percentage * x / 100) + x}</b>`
                fullTotal.innerHTML = `<b>${cartArticles[i].currency} ${(percentage * x / 100) + x}</b>`

                op1.addEventListener("click", () => {
                    perTotal = 15 * x / 100
                    percentageTotal.innerHTML = `${cartArticles[i].currency} ${perTotal}`
                    fullTotal.innerHTML = `<b>${cartArticles[i].currency} ${perTotal + x}</b>`
                })

                op2.addEventListener("click", () => {
                    perTotal = 7 * x / 100
                    percentageTotal.innerHTML = `${cartArticles[i].currency} ${perTotal}`
                    fullTotal.innerHTML = `<b>${cartArticles[i].currency} ${perTotal + x}</b>`
                })

                op3.addEventListener("click", () => {
                    perTotal = 5 * x / 100
                    percentageTotal.innerHTML = `${cartArticles[i].currency} ${perTotal}`
                    fullTotal.innerHTML = `<b>${cartArticles[i].currency} ${perTotal + x}</b>`
                })

            })

        }


    });


cardPayment.addEventListener("input", () => {
    cardFieldset.removeAttribute("disabled")
    bankFieldset.setAttribute("disabled", true)
});

bankPayment.addEventListener("input", () => {
    bankFieldset.removeAttribute("disabled")
    cardFieldset.setAttribute("disabled", true)
});

function validateInputNumber(){
   let number = document.getElementById("table-number")
   let error = document.getElementById("input-error-number")
   if(!number.value > 0){
    error.style.display ="block";
    number.style.border = "red 1px solid"
   }else{
    error.style.display ="none";
    number.style.border = "green 1px solid"
   }   
   
}

function modalValidate(){   
    let card = document.getElementById("payment-card") 
    let bank = document.getElementById("payment-bank")
    let payment = document.getElementById("terminos")
    if(card.checked){
        payment.innerText = `Tarjeta de
        crédito`
        payment.style.color="green"
    }else if(bank.checked){
        payment.innerText = `Cuenta Bancaria`
        payment.style.color="green"
    }else{
        payment.style.color="red"
    }
}

(() => {

    const forms = document.querySelectorAll(".needs-validation")
    const button = document.getElementById("close-button-modal")
    Array.from(forms).forEach(form => {
        form.addEventListener("submit", event => {
            button.addEventListener("click", () => {modalValidate()})
            validateInputNumber()   
            modalValidate()        
            if (!form.checkValidity()) {                
                event.preventDefault()
                event.stopPropagation()                
            }else{document.getElementById("alert").style.display="block"}
            
            form.classList.add('was-validated')            
        }, false)
    })
})();


let email = document.getElementById("user-email")
let user = localStorage.getItem("user");
email.innerText = user;
let url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let table = document.getElementById("cart-table")
let x = ""
let cartArticles = []


fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.articles)
        let cartArticles = data.articles
        for (let i = 0; i < cartArticles.length; i++) {
            let cartProd = ""
            cartProd +=
                `
            <td class="td"><img class="table-img"src=${cartArticles[i].image}></td>
            <td class="td">${cartArticles[i].name}</td>
            <td class="td">${cartArticles[i].currency} ${cartArticles[i].unitCost}</td>
            <td class="td"><input class="table-number"type="number" id="table-number" min="1" ></td> 
            <td class="td" id="${cartArticles[i].id}"></td>           
        `
            table.innerHTML += cartProd

            document.getElementById("table-number").addEventListener("input", function(){
                let total = document.getElementById(cartArticles[i].id)
                let inputValue = document.getElementById("table-number").value
                let x = inputValue*cartArticles[i].unitCost
                total.innerHTML = `${cartArticles[i].currency} ${x}`

            })

        }       
        

    });

    


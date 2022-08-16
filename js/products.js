
const AUTO_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
document.addEventListener("DOMContentLoaded", function(e){
    fetch(AUTO_URL)
    .then(res=> res.json())
    .then(data => {
            
    let addContent = document.getElementById('product-container')    
    for(let i = 0; i < data.products.length; i++){ 

        addContent.innerHTML += `

        
        <div onclick="setCatID(${data.products[i].id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${data.products[i].image}" alt="${data.products[i].description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${data.products[i].name} - ${data.products[i].currency} ${data.products[i].cost}</h4>
                    <small class="text-muted">${data.products[i].soldCount} artículos</small>
                </div>
                <p class="mb-1">${data.products[i].description}</p>
            </div>
        </div>
    </div>
    `
    }})
})


//my code
let PROD_URL = 'https://japceibal.github.io/emercado-api/cats_products/' + localStorage.getItem("catID") + '.json';

const priceAsc = document.getElementById("sortAsc");
const priceDesc = document.getElementById("sortDesc");
const priceRel = document.getElementById("sortRel");
let inputMin = document.getElementById("priceFilterMin");
let inputMax = document.getElementById("priceFilterMax");
let filterButton = document.getElementById("priceFilterButton");
let restoreButton = document.getElementById("clearPriceFilter");
let navBar = document.getElementById("searchBar")
let prodArray = [];
let prodArray2 = [];

let user = localStorage.getItem("user");
let email = document.getElementById("user-email")
    email.innerText=user;

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showProd(){    
    let addContent = ""
    for(let i = 0; i < prodArray.length; i++){ 
        let products = prodArray[i];

        addContent += `
        <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                        <small class="text-muted">${products.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${products.description}</p>
                </div>
            </div>
        </div>
    `
    document.getElementById('product-container').innerHTML = addContent;
    }
}

getJSONData(PROD_URL).then(function(resultObj){
    if(resultObj.status==="ok"){
        console.log(resultObj.data)
        prodArray2 = resultObj.data.products
        prodArray = resultObj.data.products
         showProd()
    }
});

//orden ascendente
priceAsc.addEventListener("click", function(){
    prodArray.sort((a,b) =>{
        if(a.cost > b.cost){return -1;}
        if(a.cost < b.cost){return 1;}
        return 0;
    })
    showProd();
})

//orden descendente
priceDesc.addEventListener("click", function(){
    prodArray.sort((a,b) =>{
        if(a.cost < b.cost){return -1;}
        if(a.cost > b.cost){return 1;}
        return 0;
    })
    showProd();
})

//orden relativo
priceRel.addEventListener("click", function(){
    prodArray.sort((a,b) =>{
        if(a.soldCount > b.soldCount){return -1;}
        if(a.soldCount < b.soldCount){return 1;}
        return 0;
    })
    showProd();
})

//filtro
filterButton.addEventListener("click", function(){
    let min;
    if(inputMin.value !=="" && inputMin.value !==undefined){
    min = inputMin.value;
    }else{min =-Infinity;}

    let max;
    if(inputMax.value !=="" && inputMax.value !==undefined){
    max = inputMax.value;
    }else{max = Infinity;}

    console.log(min)
    console.log(max)

    prodArray = prodArray2.filter(product => product.cost >= min && product.cost <= max);
    showProd();
});


restoreButton.addEventListener("click", function(){
    prodArray = prodArray2
    showProd();
});

navBar.addEventListener("keyup", function(e){
    let filtValue = e.target.value 
    let filteredProds =  prodArray2.filter( product => {
        return product.name.includes(filtValue) || product.description.includes(filtValue)       
    })
    prodArray = filteredProds
    showProd()
})

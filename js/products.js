//my code
let PROD_URL = 'https://japceibal.github.io/emercado-api/cats_products/' + localStorage.getItem("catID") + '.json';

const priceAsc = document.getElementById("sortAsc");
const priceDesc = document.getElementById("sortDesc");
const priceRel = document.getElementById("sortRel");
let inputMin = document.getElementById("priceFilterMin");
let inputMax = document.getElementById("priceFilterMax");
let filterButton = document.getElementById("priceFilterButton");
let restoreButton = document.getElementById("clearPriceFilter");
let navBar = document.getElementById("search-bar")
let prodArray = [];
let prodArray2 = [];

let user = localStorage.getItem("user");
let email = document.getElementById("user-email")
    email.innerText=user;

function showProd(){    
    let addContent = ""
    for(let i = 0; i < prodArray.length; i++){ 
        let products = prodArray[i];

        addContent += `
        <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
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

priceAsc.addEventListener("click", function(){
    prodArray.sort((a,b) =>{
        if(a.cost > b.cost){return -1;}
        if(a.cost < b.cost){return 1;}
        return 0;
    })
    showProd();
})

priceDesc.addEventListener("click", function(){
    prodArray.sort((a,b) =>{
        if(a.cost < b.cost){return -1;}
        if(a.cost > b.cost){return 1;}
        return 0;
    })
    showProd();
})

priceRel.addEventListener("click", function(){
    prodArray.sort((a,b) =>{
        if(a.soldCount > b.soldCount){return -1;}
        if(a.soldCount < b.soldCount){return 1;}
        return 0;
    })
    showProd();
})

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

/*navBar.addEventListener("keydown", function(){
    let busqueda = document.getElementById("search-bar").value
    prodArray = prodArray2.filter(prodArray2.contains(busqueda));
    showProd()
    this.contains

})*/



        

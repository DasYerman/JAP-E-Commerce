let PROD_INFO_URL = 'https://japceibal.github.io/emercado-api/products/'+ localStorage.getItem("prodID") +'.json'
let COMMENT_URL = 'https://japceibal.github.io/emercado-api/products_comments/'+ localStorage.getItem("prodID") +'.json'
let container = document.getElementById("div-container")
let comContainer = document.getElementById("com-container")
let arraySingleProd = []
let commentArray = []
let newComment = {}
let userComment = document.getElementById("user-comment")
let userScore = document.getElementById("score-list")
let submitForm = document.getElementById("comment-form")
let user = localStorage.getItem("user");
let email = document.getElementById("user-email")
    email.innerText=user;

function showSingleProd(){
    let addContent = "";
    let elements = arraySingleProd
    addContent +=`
    <div class="prod-container" >
        <div class="prod-h2-container">
            <h2>${elements.name}</h2>
        </div>
        <div class="info-container">
            <p><b>Descripción del producto:</b> ${elements.description}</p>
            <p><b>Precio: </b>${elements.currency} ${elements.cost}$</p>
            <p><b>Total vendidos: </b>${elements.soldCount}</p>
            <p><b>Imagenes del producto</b></p>
        </div>
           <div class="prod-image-container">                
                <img src="${elements.images[0]}" alt="${elements.description}" class="prod-img">
                <img src="${elements.images[1]}" alt="${elements.description}" class="prod-img">
                <img src="${elements.images[2]}" alt="${elements.description}" class="prod-img">
                <img src="${elements.images[3]}" alt="${elements.description}" class="prod-img">
            </div>
        </div>
       ` 
    container.innerHTML = addContent; 
}

function showComments(){
    let addComents = ""
    for(let i = 0; i < commentArray.length; i++){
        let comment = commentArray[i]
        let stars= ""
        for(let i = 1; i <= comment.score; i++){
            stars +=`<span class="fa fa-star checked"></span>`
        }        
        for(let i = 1; i <= 5 - comment.score; i++){
            stars +=`<span class="fa fa-star"></span>`
        }
        addComents+= 
        
        `<div class="comment-info-container">
            <p class = "comment-user-time-p">${comment.user} - ${comment.dateTime} - ${stars}</p>
            <p class = "comment-desc-p">${comment.description}</p>
            
        </div>`

        comContainer.innerHTML = addComents;
    }
}

getJSONData(PROD_INFO_URL).then(function(resultObj){
    if(resultObj.status==="ok"){
        console.log(resultObj.data)
        arraySingleProd = resultObj.data
         showSingleProd()
    }
});

getJSONData(COMMENT_URL).then(function(resultObj){
    if(resultObj.status==="ok"){
        console.log(resultObj.data)
        commentArray = resultObj.data
        showComments()
    }
});

let timeNow = new Date()    
let today = new Date();
let dd = today.getDate()
let mm = today.getMonth() 
let yyyy = today.getFullYear();    
let now = timeNow.getHours() + ":"+timeNow.getMinutes()+ ":" + timeNow.getSeconds();
today = dd + '-' + mm + '-' + yyyy + " ";

let localTime = today + now
console.log(localTime)

submitForm.addEventListener("submit", function(e){
    if(userComment.value === ""){
        e.preventDefault();
    }else{
    newComment.user = localStorage.getItem("user")
    newComment.score = userScore.value
    newComment.description = userComment.value
    newComment.dateTime = localTime
    commentArray.push(newComment)
    e.preventDefault();
    showComments()
    }

});


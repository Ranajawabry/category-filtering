const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const productId = params.id;


const getProduct= async()=>{
const response = await fetch(`https://dummyjson.com/products/${productId}`);
const data =await response.json();
console.log(data);
displayData(data)
}

const displayData = (data)=>{
    
    let resule = `
    <div class="row g-4">
    <div class=" col-md-6 img-con">
    <img src=${data.images[0]} alt="" class="h-100 w-100 rounded">
    
    </div>
    <div class="text-con col-md-6 ">
        <h2>${data.title}</h2>
        <h3 class="my-3">${data.description}</h3>
        <p class="fw-bolder my-3">price: ${data.price}$</p>
        <p class="fw-bolder my-3">Discount: ${data.discountPercentage}</p>
        <p class="fw-bolder my-3">Final price: ${data.price-(data.price*data.discountPercentage/100)}$</p>
        <p class="fw-bolder my-3">stock: ${data.stock}</p>
        <p class="fw-bolder my-3">rating: ${data.rating}</p>
        <p class="fw-bolder my-3">Brand: ${data.brand}</p>
        <p class="fw-bolder my-3">Cataegory: ${data.category}</p>
        <div class="images">
        <div class="row my-4">
 
         </div>
        </div>

    </div>
</div>
    `
 document.querySelector('.product').innerHTML=resule;
 displayImgs(data.images)

}

const displayImgs=(data)=>{
    let result=""
    data.forEach(element => {
        result +=
        `
             <div class="col-2">
              <img src = ${element} class="img-fluid"/>
            </div>
               `
        
    });
    document.querySelector('.text-con .row').innerHTML=result;

}


getProduct();


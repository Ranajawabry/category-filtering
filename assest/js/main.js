const catagoriesList = document.querySelector(".categories .list-group");
const cat_url = "https://dummyjson.com/products/categories";
let catagories = [];
const getCategory = async () => {
  const response = await fetch("https://dummyjson.com/products/categories");
  const data = await response.json();
  catagories = data;
  //console.log(data);
  displayCategories();
};

const displayCategories = () => {
  let result = `<li class= "list-group-item active" >All</li>`;
  console.log(catagories);
  catagories.forEach((item) => {
    result += `
    <li class="list-group-item">${item}</li>
    `;
  });
  catagoriesList.innerHTML = result;
  let listGroup = document.querySelectorAll(".list-group li");
  listGroup.forEach((item) => {
    item.addEventListener("click", (e) => {
        let category =e.target.innerHTML;
        clearAcive(listGroup);
        item.classList.add('active');
        // console.log(category)
      if (e.target.innerHTML ==="All") {
        getAllProduct();
        localStorage.clear()
      } else {
        item.classList.add('acive');
        localStorage.setItem('catagory',category)
        getCategoryProduct(e.target.innerHTML);
        
      }
    });
  });
};
const clearAcive= (listGroup)=>{
  listGroup.forEach((item)=>{
    if(item.classList.contains('active')){
      item.classList.remove('active');
    }
  })
  
}

const getAllProduct = async () => {
  const response = await fetch(`https://dummyjson.com/products`);
  const data = await response.json();
  displayProduct(data.products);
};
const getCategoryProduct = async (catagory) => {
  const response = await fetch(
    `https://dummyjson.com/products/category/${catagory}`
  );
  const data = await response.json();
  displayProduct(data.products);
};
getCategory();
getAllProduct();
const products = document.querySelector(".products .row");
const displayProduct = (data) => {
  if(data.length == 0){
    products.innerHTML=`
    <div class="text-center bg-secondary py-3 text-white rounded text-capitalize ">
    <p> no products avaliable...</p>
  </div>
    `
  }
  else{
    let result = "";
    data.forEach((product) => {
      result += `
          <div class="item col-4">
          <div class="card me-2 mt-2" style="width: 18rem;">
           <img src=${product.images[0]} class="card-img-top" alt="...">
           <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <span>${product.price} $</span>
           <p class="card-text">${product.description.substring(0, 70)}...</p>
              <a href="detail.html?id=${product.id}" class="btn btn-primary">Go somewhere</a>
                  </div>
              </div>
                 </div>
          `;
    });
    products.innerHTML = result;

  }
 
};

const input = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton')
console.log(searchButton);
searchButton.addEventListener('click',(e)=>{
    e.preventDefault()
    let inputText= input.value ;
    if(inputText==""){
      getAllProduct();
    }
    else{
      searchProduct(inputText);
    }
    
})
 const searchProduct = async(inputText)=>{
    const response= await fetch(`https://dummyjson.com/products/search?q=${inputText}`);
    const data =await response.json();
    console.log();
    let finalSearch
    if(localStorage.getItem('catagory')){

         finalSearch=data.products.filter((item)=>{
        return item.category ==localStorage.getItem('catagory')
        })

    }
    else{
         finalSearch=data.products;

    }
    
     displayProduct(finalSearch);

   
 }
 //////////////////////////////pagination////////////////////////////

 
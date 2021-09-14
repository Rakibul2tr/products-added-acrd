const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src="${product.image}">
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <h6 id="point" class="text-warning fw-bold">Rating : ${product.rating.rate} <br><br> Reviwe : ${product.rating.count}</h6>
      <h2 class="mb-5">Price: $ ${product.price}</h2>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-warning">add to cart</button>
      <button id="details-btn" onclick="ditailbtn(${product.rating.rate},${product.rating.count})" class="btn bg-primary text-white">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);


  }
};
/**
 * add cart hendalar and product item sonkha
 */
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price" , price);
  updateTotal ()
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};
/**
 * 
 * @param {*cart price value function}id
 * @returns 
 */
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

/**
 * 
 * @param {product item price update function} id 
 * @param {*} value 
 */
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const itemtotal = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText =itemtotal.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue( "price" );
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

/**
 * grandTotal update function
 */
const updateTotal = () => {
   const grandTotal = getInputValue("price")+ getInputValue("delivery-charge") + getInputValue("total-tax");
console.log(grandTotal);
  document.getElementById("finalytotal").innerText = grandTotal.toFixed(2);
};


/**
 * modal ditails
 */
const modal = document.getElementById('modal');
 ditailbtn = (ratin,count) =>{
  modal.innerHTML=`
  <div class="modal-dialog">
  <div class="modal-content modal-section">
    <div class="modal-header">
      <h4 class="modal-title text-primary">This product Purchase : ${count} parson</h4>
      <button type="button" class="btn-close bg-white" onclick="modalclos()" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <p class="ratingstar">
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <span class="ratingpint"> ${ratin} Rating</span>
      </p>
      <p class="text-primary">The Api of This site :&emsp; https://fakestoreapi.com/</p>
 
    </div>
  </div>
  </div>
  `
modal.style.display='block'
}
/**
 * modal ditails close
 */
modalclos=()=>{
  modal.style.display='none'
}
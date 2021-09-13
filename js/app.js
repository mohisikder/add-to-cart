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
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <div class="single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
        <h4>${product.title}</h4>
        <p>Category: ${product.category}</p>
        <h3>Price: $ ${product.price}</h3>
        <div class="d-flex justify-content-between">
          <p>Average Rate: ${product.rating.rate}</p>
          <p>Count: ${product.rating.count}</p>
        </div>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button type="button" onclick="details()" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// Details Modal
const details = () =>{
  const url = `https://fakestoreapi.com/products/1`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));
    // .then((data) => console.log((data)));
}
// Display Single Product Details 
const showDetails = (singleProducts) =>{
  // console.log(singleProducts)
  const div = document.createElement("div")
  div.innerHTML =`
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center" id="exampleModalLabel">${singleProducts.title}</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img class="img-fluid" src="${singleProducts.image}">
          <h4>Category: ${singleProducts.category}</h4>
          <p><strong>Description:</strong> <br> 
          ${singleProducts.description}</p>
        </div>
      </div>
    </div>
  </div>
  `
  document.getElementById("details-modal").appendChild(div)
}


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.abs(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.abs(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
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


//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
  getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};



// Main Data Fetching from Back-End

fetch("/data/data.json") // PHP data will be fetch from here <-------- Kaitoooooo >w<
  .then((response) => response.json())
  .then((data) => {
    cardData(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Card Data for Every Products
const cardData = (data) => {
  const cardHead = document.getElementById("card-head");
  const noCardHead = document.getElementById("no-card-head");

  cardHead.innerHTML = "";
  noCardHead.innerHTML = "";

  if (Array.isArray(data) && data.length > 0) {
    for (const item of data) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("id", `card-${item.id}`);
      card.innerHTML = `
          <img id="product_image" src="${item.image}" alt="${
        item.product_name
      }" class="card-img">
          <div class="card-body">
            <h2 id="product_name" class="card-title">${item.product_name}</h2>
            <p id="product_price" class="card-text">${item.price}৳</p>
            <button id="add_cart_${item.id}" 
                    onclick="addCart('${encodeURIComponent(
                      JSON.stringify(item)
                    )}', this)" 
                    class="card-button">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
          </div>
        `;

      cardHead.appendChild(card);
    }
  } else {
    console.error("Data is not an array or is empty:", data);
    const noCard = document.createElement("div");
    noCard.innerHTML = `
    <div>
          <h1 class="no-card">No Item Has Been Found.</h1>
        </div>
    `;
    noCardHead.appendChild(noCard);
  }
};

// Add Card Button Functions

const addCart = (enItem, button) => {
  const item = JSON.parse(decodeURIComponent(enItem));

  const textCount = document.getElementById("cart-count-text");
  const currentCount = parseInt(textCount.innerText) || 0; 
  const newCount = currentCount + 1;
  textCount.innerText = newCount;
  button.classList.remove("card-button");
  button.classList.add("added-card-button");
  button.disabled = true;

  const icon = button.querySelector("i");
  icon.classList.remove("fa-cart-shopping");
  icon.classList.add("fa-cart-arrow-down");

  button.innerHTML = `<i class="fa-solid fa-cart-arrow-down"></i> Added to Cart`;

  button.style.opacity = "0.5";
  button.style.cursor = "not-allowed";

  const countText = document.getElementById("cart-count-span");
  countText.classList.remove("hidden");
  countText.classList.add("flex");

  cartData([item]);
};

// Shopping Cart Data For Every Products
const cartData = (data) => {
  const tableBody = document.getElementById("table-inside");
  if (Array.isArray(data) && data.length > 0) {
    for (const item of data) {
      const body = document.createElement("tr");

      body.innerHTML = `
     <td>${item.product_name}</td>
                <td>${item.model}</td>
                <td>
  <input class="update" type="number" value="1" min="1" id="quantity-${item.id}" />
  <button onclick="calculateTotal('${item.id}', this)">
    <i class="fa-solid fa-arrows-rotate"></i>
  </button>
</td>
<td id="unit-${item.id}">${item.price}৳</td>
<td class="total-price" id="total-price-${item.id}">${item.price}৳</td>

`;
      tableBody.appendChild(body);
    }
  } else {
    console.error("Data is not an array or is empty:", data);
  }
};

// Calculation Logic Function

const calculateTotal = (itemId, button) => {
  const quantityInput = document.getElementById(`quantity-${itemId}`);
  const quantity = parseInt(quantityInput.value) || 0;

  const unitPriceElement = document.getElementById(`unit-${itemId}`);
  const unitPrice = parseFloat(
    unitPriceElement.innerText.replace("৳", "").trim()
  );

  const totalPrice = quantity * unitPrice;

  const totalPriceElement = document.getElementById(`total-price-${itemId}`);
  totalPriceElement.innerText = `${totalPrice}৳`;

  updateGrandTotal();
};

const updateGrandTotal = () => {
  let grandTotal = 0;

  const totalPriceElements = document.querySelectorAll(".total-price");
  totalPriceElements.forEach((element) => {
    const price = parseFloat(element.innerText.replace("৳", "").trim()) || 0;
    grandTotal += price;
  });

  const grandTotalElement = document.getElementById("grand-total");
  grandTotalElement.innerText = `${grandTotal}৳`;
};

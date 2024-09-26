fetch("/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    cardData(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

const cardData = (data) => {
  const cardHead = document.getElementById("card-head");

  if (Array.isArray(data)) {
    for (const item of data) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          <img src="${item.image}" alt="${item.product_name}" class="card-img">
          <div class="card-body">
            <h2 class="card-title">${item.product_name}</h2>
            <p class="card-text">${item.price}৳</p>
            <button id="add_cart" class="card-button">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
          </div>
        `;

      cardHead.appendChild(card);
    }
  } else {
    console.error("Data is not an array:", data);
  }
};

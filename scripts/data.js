fetch("/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    cardData(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

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

const addCart = (enItem, button) => {
  const item = JSON.parse(decodeURIComponent(enItem));

  button.classList.remove("card-button");
  button.classList.add("added-card-button");
  button.disabled = true;

  const icon = button.querySelector("i");
  icon.classList.remove("fa-cart-shopping");
  icon.classList.add("fa-cart-arrow-down");

  button.innerHTML = `<i class="fa-solid fa-cart-arrow-down"></i> Added to Cart`;

  button.style.opacity = "0.5";
  button.style.cursor = "not-allowed";
};

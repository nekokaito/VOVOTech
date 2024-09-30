const checkoutDetails = (event) => {
  event.preventDefault();

  const form = event.target;

  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const contactNumber = form.contactNumber.value;
  const email = form.email.value;
  const city = form.city.value;
  const state = form.state.value;
  const paymentMethod = form.paymentMethod.value;

  const orderData = {
    firstName,
    lastName,
    contactNumber,
    email,
    city,
    state,
    paymentMethod,
    products: [],
    grandTotal: 0,
  };

  const cartItems = document.querySelectorAll("#table-inside tr");

  let grandTotal = 0;

  cartItems.forEach((item) => {
    const productName = item.querySelector("td:nth-child(1)").innerText;
    const model = item.querySelector("td:nth-child(2)").innerText;
    const quantity = item.querySelector("input.update").value;
    const totalPrice = item
      .querySelector(".total-price")
      .innerText.replace("৳", "")
      .trim();

    const total = parseFloat(totalPrice);
    grandTotal += total;

    orderData.products.push({
      productName,
      model,
      quantity,
      totalPrice: total,
    });
  });

  orderData.grandTotal = grandTotal;

  console.log(orderData);
  exitCheckoutModal();
  doneToast();

  // Prince needs this data ...... O Meri Khuda..... 

  fetch("/path-to-your-backend-script.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData), 
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

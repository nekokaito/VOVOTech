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
  };

  //   console.log(orderData); Prince Need This data
};

/** @format */

"use strict";

let colorImage = document.querySelectorAll(".color-image");
let currentColor = document.querySelectorAll(".current-color");
let agreeBtn = document.querySelector(".agree-button");
let checkoutBtn = document.querySelector(".checkout");
let addToCartBtn = document.querySelector(".add-to-cart");
let modalQuantity = document.querySelector(".modal-quantity");
let incrementBtn = document.querySelector(".increment");
let decrementBtn = document.querySelector(".decrement");
let fullPrice = document.querySelector("#full-price");
let specialPrice = document.querySelector("#special-price");
let details = document.querySelector(".details");
let customFitQuantity = document.querySelector(".badge");
let modalTable = document.querySelector("#summary-modal tbody");
let finalCheckoutBtn = document.querySelector(".final-checkout");

let grandTotal = document.querySelector(".grand-total");
let arrArr = [];


// Function that targets the clicked color circles and changes relatives labels to the name of the clicked color
const targetColorCircles = (event) => {
  let target = event.currentTarget;

  for (let i = 0; i < colorImage.length; i++) {
    if (colorImage[i] == target) {
      colorImage[i].classList.toggle("toggle-border"); // Add a border to color circles
      for (let j = 0; j < currentColor.length; j++) {
        currentColor[j].innerText = target.classList[1].toUpperCase(); // Changes the value the color in the modal and COLOR:
      }
    } else if (colorImage[i] != target) {
      colorImage[i].classList.remove("toggle-border");
    }
  }
  addToCartBtn.style.display = "block";
  checkoutBtn.style.display = "none";
  modalQuantity.innerText = 0;
  addToCartBtn.disabled = false;
};


// Adds 1 to modal Quantity
const increment = () => {
  incrementBtn.addEventListener("click", () => {
    modalQuantity.innerText++;
  });
};


// Subtracts 1 from modal Quantity
const decrement = () => {
  decrementBtn.addEventListener("click", () => {
    modalQuantity.innerText <= 0
      ? (modalQuantity.innerText = 0)
      : modalQuantity.innerText--;
  });
};


// Calculates out the 25% off sale from every original price and display the sale price
const calcPrice = () => {
  for (let i = 0; i < colorImage.length; i++) {
    colorImage[i].addEventListener("click", () => {
      fullPrice.innerText = colorImage[i].getAttribute("data-price");
      let percentage = (75 / 100) * fullPrice.innerText;
      specialPrice.innerText = parseFloat(percentage).toFixed(2);
    });
  }
};


// Adds circles to the details section
const addDetailsCircles = () => {
  let checkoutColor = currentColor[0].innerText.toLowerCase();
  for (let x = 0; x < modalQuantity.innerText; x++) {
    details.innerHTML += ` <div class="col-md-1 col-sm-1 col-2"> 
        <img src="./images/${checkoutColor}.png" class="details-circles ${checkoutColor}">
      </div>`;
  }
};


// Interchanges the add-to-cart and checkout buttons
// Outputs the length for the custom fit
const toggleButtons = () => {
  let detailsLength = document.querySelectorAll(".details-circles").length;
  customFitQuantity.innerText = detailsLength;
  addToCartBtn.style.display = "none";
  checkoutBtn.style.display = "block";
};


// Adds data to the checkout modal table (cart) from the current selected item
// The data being added is circle name and color, quantity, total for the quantity
const addToSummaryTable = () => {
  let checkoutColor = currentColor[0].innerText.toLowerCase();
  let singleProductTotal = (
    specialPrice.innerText * modalQuantity.innerText
  ).toFixed(2);
  modalTable.innerHTML += `<tr>
      <td class="fw-normal small"><img src="./images/${checkoutColor}.png" style="width: 20px;">  ${checkoutColor}</td>
      <td class="fw-normal checkout-quantity">${modalQuantity.innerText}</td>
      <td class="product-total fw-normal">R ${singleProductTotal}</td>
    </tr>`;
  arrArr.push(singleProductTotal);
  console.log(arrArr);
};

// Add up the total for all the color cicles that are on the checkout table
const finalTotal = () => {
  checkoutBtn.addEventListener("click", () => {
    let sum = 0;
    for (let p = 0; p < arrArr.length; p++) {
      sum += parseFloat(arrArr[p]);
    }
    grandTotal.innerText = `R ${sum.toFixed(2)}`;
  });
};

// Pops an alert and refreshes the page when you click the final checkout button
const finalCheckout = () => {
  finalCheckoutBtn.addEventListener("click", () => {
    alert("Thank you for purchasing, Bye");
    location.reload();
  });
};

// Event listener for the Agree Button
// Calling functions when clicking the agree button
let agreeFunc = () => {
  agreeBtn.addEventListener("click", () => {
    addDetailsCircles();
    toggleButtons();
    addToSummaryTable();
  });
};

calcPrice();
increment();
decrement();
agreeFunc();
finalTotal();
finalCheckout();

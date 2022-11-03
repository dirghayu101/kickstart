let cartItems = JSON.parse(localStorage.getItem("cartData"));
cartItems = cartItems.filter((item) => item.value !== 0);

let spaceDataObjects = {
  Cubicle: {
    imgSrc: "/assets/user-panel/catalogue/cubicle.webp",
    objName: "Cubicle",
    price: 300,
  },
  "Hot Seat": {
    imgSrc: "/assets/user-panel/catalogue/hotSeat.webp",
    objName: "Hot Seat",
    price: 600,
  },
  "Private Office": {
    imgSrc: "/assets/user-panel/catalogue/privateOffice.webp",
    objName: "Private Office",
    price: 1500,
  },
  "Conference Room": {
    imgSrc: "/assets/user-panel/catalogue/conferenceRoom.webp",
    objName: "Conference Room",
    price: 6000,
  },
};



let putCartItems = (cartItems) => {cartItems.forEach((item) => {
  let thisItem = spaceDataObjects[item.itemID];
  let { imgSrc, objName, price } = thisItem;
  let value = item.value
  let defaultDate = getDate()
  let div = document.createElement('div')
  div.innerHTML  = `${`<div class="item-row">
  <div class="item-picture">
      <img src="`}`+imgSrc+`${`" srcset="">
  </div>
  <div class="space-type">
      <p>`}`+objName+`${`</p>
  </div>
  <div class="number-item">
      <span class="material-symbols-rounded decrement">remove</span>
      <span class="quantity item-value">`}`+value+`${`</span>
      <span class="material-symbols-rounded increment">add</span>
  </div>
  <div class="date">
      <input type="date" value=${defaultDate}>
      <p>TO</p>
      <input type="date">
  </div>
  <div class="price">
      <p>₹`}`+price+`${`</p>
  </div>
</div>`}`;

  document.querySelector("#insertRows").appendChild(div)
});}

putCartItems(cartItems)

let increments = document.querySelectorAll(".increment");
let decrements = document.querySelectorAll(".decrement");
let itemValues = document.querySelectorAll(".item-value");

increments.forEach((increment) => {
  increment.addEventListener("click", () => {
    let thisItemID = increment.parentElement.parentElement.querySelector(".space-type p").innerHTML.trim();
    let search = cartItems.find((item) => item.itemID === thisItemID)
    if(search === undefined){
        cartItems.push({
            itemID: thisItemID,
            value: 1
        })
    }else{
        search.value += 1 
    }
    localStorage.setItem("cartData", JSON.stringify(cartItems))
    let itemValue = increment.parentElement.querySelector(".item-value");
    let currentValue = parseInt(itemValue.innerHTML);
    itemValue.innerHTML = currentValue + 1;
    putTotal();
  });
});

decrements.forEach((decrement) => {
  decrement.addEventListener("click", () => {
    let itemValue = decrement.parentElement.querySelector(".item-value");
    let currentValue = parseInt(itemValue.innerHTML);
    let thisRow = decrement.parentElement.parentElement;
    let thisItemID = thisRow.querySelector(".space-type p").innerHTML.trim()
    let search = cartItems.find((item) => item.itemID === thisItemID)
    if(search === undefined) return;
    else if(search.value === 0) return;
    else{
        search.value -= 1
    }
    localStorage.setItem("cartData", JSON.stringify(cartItems))
    if (currentValue !== 0) {
      currentValue = currentValue - 1;
      itemValue.innerHTML = currentValue;
      putTotal();
      if (currentValue === 0) {
        thisRow.style.display = "none";
      }
    }
  });
});

let putTotal = () => {
  let allRows = document.querySelectorAll(".item-row");
  let rowTotalArr = [];
  let totalAmount = 0;
  allRows.forEach((row) => {
    let spaceType = row.querySelector(".space-type p").innerHTML.trim();
    let numItem = parseInt(
      row.querySelector(".number-item .item-value").innerHTML.trim()
    );
    let itemPrice = parseInt(spaceDataObjects[spaceType].price);
    let totalValue = itemPrice * numItem;
    row.querySelector(".price p").innerHTML = "₹" + totalValue;
    rowTotalArr.push(totalValue);
  });
  rowTotalArr.forEach((total) => {
    totalAmount += total;
  });
  document.querySelector(".total-price .total-value").innerHTML =
    "₹" + totalAmount;
};

//document.querySelector('.date input').defaultValue = "2002-09-21"

putTotal();



// document.querySelector('.date input').defaultValue = dateString



const userData = {
    dashboard: {
        mainBody: ``,
        script: `<script>document.querySelector('.dashboard').classList.add('active')</script>`
    },
    spaces: {
        mainBody: `<h1 id="bookHeading">Book Your Space</h1>
            <div class="outer-box">
                <div class="space">
                    <div class="image-box">
                        <img src="/assets/user-panel/catalogue/conferenceRoom.webp" class="space-image">
                    </div>
                    <div class="space-info">
                        <h2>Conference Room</h2>
                        <p>For ₹2000 per hour.</p>
                        <button class="book-btn addBtn removeBtn">Add to cart</button>
                        <!-- book-btn is the class for add to cart option. -->
                    </div>
                </div>
                <div class="space">
                    <div class="image-box">
                        <img src="/assets/user-panel/catalogue/privateOffice.webp" class="space-image">
                    </div>
                    <div class="space-info">
                        <h2>Private Office</h2>
                        <p>From ₹27,000 per month.</p>
                        <button class="book-btn addBtn removeBtn">Add to cart</button>
                    </div>
                </div>
                <div class="space">
                    <div class="image-box">
                        <img src="/assets/user-panel/catalogue/hotSeat.webp" class="space-image">
                    </div>
                    <div class="space-info">
                        <h2>Hot Seat</h2>
                        <p>From ₹18,000 per month</p>
                        <button class="book-btn addBtn removeBtn">Add to cart</button>
                    </div>
                </div>
                <div class="space">
                    <div class="image-box">
                        <img src="/assets/user-panel/catalogue/cubicle.webp" class="space-image">
                    </div>
                    <div class="space-info">
                        <h2>Cubicle</h2>
                        <p>From ₹12,000 per month.</p>
                        <button class="book-btn addBtn removeBtn">Add to cart</button>
                    </div>
                </div>
            </div>`,
        script: `<script>document.querySelector('.spaces').classList.add('active')
        cartButton = document.querySelector('.cart-btn button')
        cartButton.innerHTML = 'Go to cart'
        cartButton.classList.add('go-to-cart')
        cartItems = JSON.parse(localStorage.getItem("cartData")) || []
        allBtn = document.querySelectorAll(".addBtn")
allRemoveBtn = document.querySelectorAll(".removeBtn")

eventListenersAllBtn = () => { 
        allBtn.forEach((btn) => btn.addEventListener('click', () => {
            let currentItemID = btn.parentElement.querySelector('h2').innerHTML.trim()
            let search = cartItems.find((item) => item.itemID === currentItemID)
            if(search === undefined){
                cartItems.push({
                    itemID: currentItemID,
                    value: 1
                })
            } else{
                search.value = 1
            }
            btn.innerHTML = "Added"
            btn.className = "removeBtn remove-book-btn"
            console.log(cartItems)
            localStorage.setItem("cartData", JSON.stringify(cartItems))
            btn.addEventListener('click', () => {
                search = cartItems.find((item) => item.itemID === currentItemID)
                if(search === undefined) return;
                else if(search.value === 0) return;
                else{
                    search.value = 0
                }
                btn.innerHTML = "Add to cart"
                btn.className = "book-btn addBtn removeBtn"
                console.log(cartItems)
                localStorage.setItem("cartData", JSON.stringify(cartItems))
                eventListenersAllBtn()
            })
    }))
}
eventListenersAllBtn()

allRemoveBtn.forEach((btn) => btn.addEventListener('mouseover', () => {
    if (btn.classList.contains('remove-book-btn')) {
        btn.innerHTML = "Remove"
    }
}))

allRemoveBtn.forEach((btn) =>
    btn.addEventListener('mouseout', () => {
        if (btn.classList.contains('remove-book-btn')) {
            btn.innerHTML = "Added"
        }
    }))
        </script>`
    },
    cart:{
        mainBody: `<div class="outer-box">
        <h2>Shopping Cart</h2>
        <div class="outer-layer">
            <div class="cart-body">
                <div class="heading-row">
                    <div class="heading-row-type">
                        <p>Type</p>
                    </div>
                    <div class="heading-row-space">
                        <p>Space</p>
                    </div>
                    <div class="heading-row-date">
                        <p>Date</p>
                    </div>
                    <div class="heading-row-price">
                        <p>Price</p>
                    </div>
                </div>
                <div id="insertRows">
                
                </div>
            </div>

        </div>
    </div>
    <div class="total-price">
        <p class="title-total">TOTAL:</p>
        <p class="total-value">₹9000</p>
    </div>
</div>`,
        script: ` 
        <script>
        document.querySelector('.spaces').classList.add('active')
        cartButton = document.querySelector('.cart-btn button')
        cartButton.innerHTML = 'checkout'
        cartButton.classList.add('checkout')
        cartItems = JSON.parse(localStorage.getItem("cartData"));
cartItems = cartItems.filter((item) => item.value !== 0);

spaceDataObjects = {
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

putCartItems(cartItems)

 increments = document.querySelectorAll(".increment");
 decrements = document.querySelectorAll(".decrement");
 itemValues = document.querySelectorAll(".item-value");

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

putTotal = () => {
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

putTotal();
        </script>
        `,
    },
    orders: {
        mainBody: ``,
        script: `<script>document.querySelector('.orders').classList.add('active')</script>`
    },
    feedback: {
        mainBody: ``,
        script: `<script>document.querySelector('.feedback').classList.add('active')</script>`
    },
    support: {
        mainBody: ``,
        script: `<script>document.querySelector('.support').classList.add('active')</script>`
    },
    reschedule: {
        mainBody: ``,
        script: `<script>document.querySelector('.reschedule').classList.add('active')</script>`
    },
}

module.exports = userData
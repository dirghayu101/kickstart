const userData = {
    dashboard: {
        mainBody: ``,
        script: `<script>document.querySelector('.dashboard').classList.add('active')</script>`
    },
    spaces: {
        mainBody: `<h1 id="bookHeading">Book Your Space</h1>
            <div class="outer-box" id="myCatalogue">
            </div>`,
        script: `<script>document.querySelector('.spaces').classList.add('active')
        cartButton = document.querySelector('.cart-btn button')
        cartButton.innerHTML = 'Go to cart'
        cartButton.classList.add('go-to-cart')

        spaceObjects = {
            'Conference Room': {
                img: "/assets/user-panel/catalogue/conferenceRoom.webp",
                spaceType: "Conference Room",
                spacePrice: "For ₹6000 per day",
            },
            'Private Office': {
                img: "/assets/user-panel/catalogue/privateOffice.webp",
                spaceType: "Private Office",
                spacePrice: "For ₹1500 per day",
            },
            'Hot Seat': {
                img: "/assets/user-panel/catalogue/hotSeat.webp",
                spaceType: "Hot Seat",
                spacePrice: "For ₹600 per day",
            },
            'Cubicle': {
                img: "/assets/user-panel/catalogue/cubicle.webp",
                spaceType: "Cubicle",
                spacePrice: "For ₹300 per day",
            },
        }

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

function removeBtn(){
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
}
    
    function openCartPage() {
        cartButton.addEventListener('click', () => {
            getPage('to-cart')
        });
    }
    createSpaceCatalogue()
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
//modifyCart() --> This will return a promise which would be pending.
 getCartItems = async () => {
     cartItems = JSON.parse(localStorage.getItem("cartData")) || []
     let availableCartItems = await getAvailableSpaces()
     cartItems = cartItems.filter((item) => item.value !== 0)
     let tempObj = {}
    availableCartItems.forEach((item) => {
        let temp = cartItems.find((value) => value.itemID === item)
        if(item === temp.itemID){
            tempObj[item] = cartItems.find((value) => value.itemID === item)
        }
        cartItems.find((value) => {
            console.log("This ", value.itemID)

        })
        console.log(item)
    })
    }
    getCartItems()
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

function getOrderArray() {
    let cartRows = document.querySelectorAll("#insertRows .item-row")
    let reservationArr = []
    cartRows.forEach((row) => {
        let spaceType = row.querySelector('.space-type p').innerHTML.trim()
        let numberOfSpace = parseInt(row.querySelector('.item-value').innerHTML.trim())
        let reservationDate = row.querySelector('.date input').value
        let myObj = { space: spaceType, numberOfSpace: numberOfSpace, reservationDate: reservationDate }
        reservationArr.push(myObj)
    })
    return reservationArr
}

function makeReservation() {
    cartButton.addEventListener('click', async() => {
        let reservationArr = getOrderArray()
        let authorizationHeader = localStorage.getItem('userToken') + " " +localStorage.getItem('mail')
        
        const result = await fetch("/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authorizationHeader
            },
            body: JSON.stringify({
                reservationArr
            }),
        }).then((res) => res.json())
        if(result.status === 'ok'){
            cartItems = JSON.parse(localStorage.getItem("cartData"))
            cartItems.forEach((item) => item.value = 0)
            localStorage.setItem("cartData", JSON.stringify(cartItems))
            getPage('orders')
        } else{
            alert(result.error)
        }
    })
}

makeReservation()
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
const form = document.getElementById("login-form");
form.addEventListener("submit", loginUser);
let sideMenu = undefined
let menuBtn = undefined
let closeBtn = undefined
let themeToggler = undefined
let getPage = undefined
let allBtn = undefined
let allRemoveBtn = undefined
let increments = undefined
let decrements = undefined
let itemValues = undefined
let spaceDataObjects = undefined
let putTotal = undefined
let cartItems = undefined
let eventListenersAllBtn = undefined
let cartButton = undefined
let spaceObjects = undefined
let getCartItems = undefined

async function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const result = await fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());

  if (result.status === "ok") {
    getUserPage(result);
  } else {
    alert(result.error);
  }
}

async function getUserPage(result){
  localStorage.setItem('userToken', result.data);
  localStorage.setItem('mail', document.getElementById("email").value)
  const userPanel = await fetch('/user/dashboard',{
    method: 'GET',
    headers: {
      Authorization: `${localStorage.getItem('userToken')} ${localStorage.getItem('mail')}`
    },
  }).then((res) => res.text())
  document.querySelector('html').innerHTML = userPanel
  let scriptTags = document.querySelectorAll('script')
  scriptTags.forEach((tag) =>{
    let scriptTag = document.createElement('script')
    scriptTag.innerHTML = tag.innerHTML
    document.body.appendChild(scriptTag)
  })
}

let getDate = () => {
  const date = new Date()
  let currentYear = date.getFullYear()
  let currentMonth = undefined
  let currentDate = undefined
  if(date.getMonth().toString().length !== 2){
    currentMonth = '0'+date.getMonth().toString()
  } else{
    currentMonth = date.getMonth()
  }
  if(date.getDate().toString().length !== 2){
    currentDate = '0'+date.getDate().toString()
  } else{
    currentDate = date.getMonth()
  }
  let dateString = currentYear + '-' + currentMonth + '-' + currentDate
  return dateString
}

let putCartItems = (cartItems) => {cartItems.forEach((item) => {
  let thisItem = spaceDataObjects[item.itemID];
  let { imgSrc, objName, price } = thisItem;
  let value = item.value
  let div = document.createElement('div')
  let defaultDate = getDate()
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
  </div>
  <div class="price">
      <p>₹`}`+price+`${`</p>
  </div>
</div>`}`;

  document.querySelector("#insertRows").appendChild(div)
});}

const populateCataloguePage = (spaceArr) => {
  spaceArr.forEach((space) => {
      let {img, spaceType, spacePrice} = spaceObjects[space]
      let div = document.createElement('div')
      div.innerHTML = `<div class="space">
          <div class="image-box">
              <img src="${img}" class="space-image">
          </div>
          <div class="space-info">
              <h2>${spaceType}</h2>
              <p>${spacePrice}.</p>
              <button class="book-btn addBtn removeBtn">Add to cart</button>
          </div>
      </div>`
      document.querySelector('#myCatalogue').appendChild(div)

  })
}

const createSpaceCatalogue = async () => {
  const result = await fetch('/user/space-status', {
      method: 'GET',
      headers: {
          Authorization: `${localStorage.getItem('userToken')} ${localStorage.getItem('mail')}`
      },
  }).then((res) => res.json())
  let resultArr = Object.keys(result)
  populateCataloguePage(resultArr)
  cartItems = JSON.parse(localStorage.getItem("cartData")) || []
  allBtn = document.querySelectorAll(".addBtn")
  allRemoveBtn = document.querySelectorAll(".removeBtn")
  eventListenersAllBtn()
  removeBtn()
  openCartPage()
}

const getSpaceStatus = async () => {
  const result = await fetch('/user/space-status', {
    method: 'GET',
    headers: {
      Authorization: `${localStorage.getItem('userToken')} ${localStorage.getItem('mail')}`
    },
  }).then((res) => res.json())
  return result  
}

const getAvailableSpaces = async () => {
  let spaceObj = await getSpaceStatus()
  return Object.keys(spaceObj)
}
const form = document.getElementById("login-form");
form.addEventListener("submit", loginUser);
let sideMenu = undefined
let menuBtn = undefined
let closeBtn = undefined
let themeToggler = undefined
let getPage = undefined


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
    console.log("Got the token: ", result.data);
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

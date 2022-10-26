
const form = document.getElementById('reg-form');
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phoneNumber = document.getElementById("phoneNumber");
const fPassword = document.getElementById("fPassword");
const sPassword = document.getElementById("sPassword");
form.addEventListener('submit', checkInputs);
form.addEventListener('submit', registerUser);

async function registerUser(event){
  event.preventDefault();     //The default action of a form is to reload, this will prevent that from happening.
  const gender = getGender();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const emailID = document.getElementById("emailID").value;
  const password = document.getElementById("sPassword").value;

  const result = await fetch('/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName,
      phoneNumber,
      emailID,
      password,
      gender
    })
  }).then((res) => res.json())
  .then((data) => console.log(data))
}

function getGender(){
    if(document.getElementById('dot-1').checked){
        return "Male";
    }
    if(document.getElementById('dot-2').checked){
        return "Female"
    }
    if(document.getElementById('dot-3').checked){
        return "Other";
    }
}
function checkInputs() {
    const firstNameVal = firstName.value.trim();
    const lastNameVal = lastName.value.trim();
    const phoneNumberVal = phoneNumber.value.trim();
    const emailIDVal = emailID.value.trim();
    const fPasswordVal = fPassword.value.trim();
    const sPasswordVal = sPassword.value.trim();

      if(firstNameVal === ""){
        setErrorFor(firstName, 'Name cannot be blank');
      } else if (!isName(firstNameVal)) {
        setErrorFor(firstName,'Name must have alphabet characters only');
      } else {
        setSuccessFor(firstName);
      }

      if(lastNameVal === ""){
        setErrorFor(lastName, 'Name cannot be blank');
      } else if (!isName(lastNameVal)) {
        setErrorFor(lastName,'Name must have alphabet characters only');
      } else {
        setSuccessFor(lastName);
      }
    
    if(phoneNumberVal === '') {
      setErrorFor(phoneNumber, 'Phone number cannot be blank');
    } else if (!isNumber(phoneNumberVal)) {
      setErrorFor(phoneNumber, 'Not a valid phone number');
    } else {
      setSuccessFor(phoneNumber);
    }

    if(emailIDVal === "") {
      setErrorFor(emailID, 'Email cannot be blank');
    } else if (!isEmail(emailIDVal)) {
      setErrorFor(emailID, 'Not a valid email');
    } else {
      setSuccessFor(emailID);
    }

    if(fPasswordVal === '') {
      setErrorFor(fPassword, 'Password cannot be blank');
    } else if (fPasswordVal.length <= 4) {
      setErrorFor(fPassword, 'Enter minimum 5 characters');
    } else {
      setSuccessFor(fPassword);
    }

    if(sPasswordVal === '') {
      setErrorFor(sPassword, 'Password cannot be blank');
    } else if (fPasswordVal !== sPasswordVal) {
      setErrorFor(sPassword, 'Confirm password does not match with the entered password');
    } else {
      setSuccessFor(sPassword);
    }
  }

  function setErrorFor(input, message) {
    const inputBox = input.parentElement;
    const small = inputBox.querySelector('small');
    inputBox.className = 'user-details input-box error';
    small.innerText = message;
  }
  
  function setSuccessFor(input) {
    const inputBox = input.parentElement;
    inputBox.className = 'user-details input-box success';
  }

  function isNumber(phoneNumberVal) {
    return /^[0-9]+$/.test(phoneNumberVal);
  }

  function isEmail(emailIDVal) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailIDVal);
  }

  function isName(firstNameVal) {
    return /^[A-Za-z]+$/.test(firstNameVal);
  }
    
  function isName(lastNameVal) {
    return /^[A-Za-z]+$/.test(lastNameVal);
  }

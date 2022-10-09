
const form = document.getElementById('reg-form');
    form.addEventListener('submit', registerUser);

    async function registerUser(event){
      if(passwordNotCorrect() ){
        return;
      }
      event.preventDefault();     //The default action of a form is to reload, this will prevent that from happening.
      const gender = getGender();
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const phoneNumber = document.getElementById("phoneNumber").value;
      const emailID = document.getElementById("emailID").value;
      const password = document.getElementById("sPassword").value;

      const result = await fetch('/api/signup', {
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

    function passwordNotCorrect(){
      const fPassword = document.getElementById("fPassword").value;
      const sPassword = document.getElementById("sPassword").value;
      console.log(fPassword === sPassword);
      console.log(fPassword == sPassword);

      if(fPassword === sPassword){
        return false;
      }
      else{
        alert("Confirm password didn't match with the entered password.");
        return true;
      }
    }
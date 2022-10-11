// Code for delete functionality starts here.
var allDeleteButtons = document.querySelectorAll(".delete-row");
allDeleteButtons.forEach((deleteButton) =>
  deleteButton.addEventListener("click", function () {
    var firstName = deleteButton.parentElement
      .querySelector("td")
      .innerHTML.trim();
    var confirm = prompt(
      `This action will delete the row with the first name ${firstName}. This action cannot be reverted. Type 'CONFIRM' to continue the action.`
    );
    if (confirm === "CONFIRM") {
      deleteButton.parentElement.style.setProperty("display", "none");
      var phoneNumber = deleteButton.parentElement
        .querySelector(".phone-number")
        .innerHTML.trim();
      deleteRequest(phoneNumber);
    } else {
      return;
    }
  })
);

async function deleteRequest(value) {
  const result = await fetch(`/admin/delete/users/${value}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  //TODO: An alert or something after this is successful that the data has been deleted from the database.
}
// Code for delete ends here.

// Code for update starts here

// This function will set the table as editable.
var editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((button) =>
  button.addEventListener("click", function () {
    var getCells = button.parentElement.parentElement.querySelectorAll("td");
    console.log(getCells);
    var length = getCells.length;
    for (var i = 0; i <= 3; i++) {
      if (i == 2) {
        continue;
      }
      getCells[i].contentEditable = "true";
    }
  })
);

var saveButtons = document.querySelectorAll(".save-button");
saveButtons.forEach((button) =>
  button.addEventListener("click", function () {
    var checkEditable =
      button.parentElement.parentElement.querySelector("td").contentEditable;
    console.log(checkEditable);
    if (checkEditable === "false" || checkEditable === "inherit") {
      return;
    }
    var fName = button.parentElement.parentElement
      .querySelector("td")
      .innerHTML.trim();
    var confirm = prompt(
      `The action will override all the values with the current first name ${fName}. Type 'CONFIRM' to continue the action.`
    );
    if (confirm !== "CONFIRM") {
      console.log("Cancelled");
      return;
    }
    var row = button.parentElement.parentElement;
    updateRow(row);
  })
);

async function updateRow(row) {
  var cells = row.querySelectorAll("td");
  var fName = cells[0].innerHTML.trim();
  var lName = cells[1].innerHTML.trim();
  var phoneNumber = cells[2].innerHTML.trim();
  var mailID = cells[3].innerHTML.trim();

  const result = await fetch(`admin/users/${phoneNumber}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fName,
      lName,
      phoneNumber,
      mailID,
    }),
  });
}
//TODO: Update functionality is working fine on the database side. But there are following things to do to make it more useful:
// 1. The result isn't showing up of both deletion, insertion or update function, server needs to be restarted for that. This needs to be fixed.
// 2. The user isn't receiving any message that tells him that the insertion or whatever is successful, user should receive a message, or some error occurred in case error arise. And we need to be specific about the error. Maybe a type mistake or something.
// 3. Then you have to remove the editable property saving the data entered or retrieving the original data incase the operation failed.

// Code for insert user functionality starts here.
var insertButton = document.querySelector(".add-button");
insertButton.addEventListener("click", function () {
    var row = insertButton.parentElement.parentElement;
    updateTable(row);
    insertTable(row);
    
});

async function insertTable(row){
    var inputValues = row.querySelectorAll("input");
    console.log(inputValues);
    let firstName = inputValues[0].value;
    let lastName = inputValues[1].value;
    let phoneNumber = inputValues[2].value;
    let emailID = inputValues[3].value;
    let password = 12345678;
    let gender = "Other";
    inputValues.forEach(input => input.value='');
    const result = await fetch(`admin/users`, {
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
    })
}
function updateTable(row){
    var inputValues = row.querySelectorAll("input");
    let fName = inputValues[0].value;
    let lName = inputValues[1].value;
    let phoneNumber = inputValues[2].value;
    let email = inputValues[3].value;
    const tr = document.createElement("tr");
    tr.classList.add("user-row");
    const trContent = `
        <td>${fName}</td>
        <td>${lName}</td>
        <td>${phoneNumber}</td>  
        <td>${email}</td>
        <td class="danger">Delete</td>
        <td>
            <span class="edit-button material-icons-sharp">edit</span>
            <span class="save-button material-icons-sharp">save</span>
        </td>
    `;
    tr.innerHTML = trContent;
    document.querySelector(".first-table").appendChild(tr);
}

// TODO: The update functionality is working fine, but there are some works to do:
// 1. You need to create a single API for handling all the insertion. There are multiple points for handling insertion in my server.
// 2. API is not rest compliant. Work on making it REST compliant.
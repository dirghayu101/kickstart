data.table.forEach((element) => {
  const tr = document.createElement("tr");
  const trContent = `
    <td>${element.fName}</td>
    <td>${element.lName}</td>
    <td>${element.phoneNumber}</td>  
    <td>${element.eMail}</td>
    <td class="danger">Delete</td>
`;

  tr.innerHTML = trContent;
  document.querySelector("table tbody").appendChild(tr);
});

//!NOTE: This file isn't linked anymore.
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector('.theme-toggler');

console.log("loaded");

alert("JS loaded!")
// Show sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

// Close sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none'; 
})

// Change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables'); 
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})
// Toggle will hide an element if it shown and show an element if it is hidden.



/* 
!If you have a json or js file which has an array of object orders.
!You can do the following to populate your data into your table.

Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>  
        <td>${order.shipping}</td>
    `
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
})

*/
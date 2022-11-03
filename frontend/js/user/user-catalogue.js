let cartItems = JSON.parse(localStorage.getItem("cartData")) || []

allBtn = document.querySelectorAll(".addBtn")
allRemoveBtn = document.querySelectorAll(".removeBtn")

let eventListenersAllBtn = () => { 
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

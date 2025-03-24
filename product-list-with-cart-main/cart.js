// document.addEventListener("DOMContentLoaded", () => {
//     let cartTotal = 0;
//     let cartCount = 0;
//     let cart = {};

//     document.querySelectorAll(".add-to-cart").forEach(button => {
//         button.addEventListener("click", () => {
//             let item = button.closest(".item");
//             let itemId = item.getAttribute("data-id");
//             let itemName = item.querySelector("h3").textContent;
//             let itemPrice = parseFloat(item.querySelector("p").textContent.replace("$", ""));

//             // If item exists, increase quantity; otherwise, add it
//             if (cart[itemId]) {
//                 cart[itemId].quantity += 1;
//             } else {
//                 cart[itemId] = { name: itemName, price: itemPrice, quantity: 1 };
//             }

//             cartTotal += itemPrice;
//             cartCount += 1;

//             updateCartUI();
//         });
//     });

//     function updateCartUI() {
//         const cartItemsList = document.getElementById("cart-items");
//         const cartTotalSpan = document.getElementById("cart-total");
//         const cartCountSpan = document.getElementById("cart-count");

//         cartItemsList.innerHTML = ""; // Clear cart list

//         Object.entries(cart).forEach(([id, item]) => {
//             let listItem = document.createElement("li");
//             listItem.innerHTML = `${item.name} ($${item.price.toFixed(2)}) x${item.quantity} 
//                 <button class="remove-item" data-id="${id}">Delete</button>`;
//             cartItemsList.appendChild(listItem);
//         });

//         cartTotalSpan.textContent = cartTotal.toFixed(2);
//         cartCountSpan.textContent = cartCount;

//         // Add event listeners to delete buttons
//         document.querySelectorAll(".remove-item").forEach(button => {
//             button.addEventListener("click", () => {
//                 let itemId = button.getAttribute("data-id");
//                 let itemPrice = cart[itemId].price;
//                 let itemQuantity = cart[itemId].quantity;

//                 cartTotal -= itemPrice * itemQuantity;
//                 cartCount -= itemQuantity;

//                 delete cart[itemId];

//                 updateCartUI();
//             });
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    let cartTotal = 0;
    let cartCount = 0;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCartToStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartUI() {
        const cartItemsList = document.getElementById("cart-items");
        const cartTotalSpan = document.getElementById("cart-total");
        const cartCountSpan = document.getElementById("cart-count");

        cartItemsList.innerHTML = ""; // Clear cart list
        cartTotal = 0;
        cartCount = 0;

        cart.forEach((item, index) => {
            cartTotal += item.price;
            cartCount++;

            let listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <p>${item.name} ($${item.price.toFixed(2)})</p>
                        <button class="remove-item" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(listItem);
        });

        cartTotalSpan.textContent = cartTotal.toFixed(2);
        cartCountSpan.textContent = cartCount;

        // Add event listeners to delete buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                let index = button.getAttribute("data-index");
                let removedItem = cart.splice(index, 1)[0];

                cartTotal -= removedItem.price;
                cartCount--;

                saveCartToStorage();
                updateCartUI();
            });
        });
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            let item = button.closest(".item");
            let itemId = item.getAttribute("data-id");
            let itemName = item.querySelector("h3").textContent;
            let itemPrice = parseFloat(item.querySelector("p").textContent.replace("$", ""));
            let itemImage = item.querySelector("img").src;

            let cartItem = {
                id: `${itemId}-${Date.now()}`, // Unique identifier
                name: itemName,
                price: itemPrice,
                image: itemImage
            };

            cart.push(cartItem);
            cartTotal += itemPrice;
            cartCount++;

            saveCartToStorage();
            updateCartUI();
        });
    });

    updateCartUI(); // Load cart on page refresh
});




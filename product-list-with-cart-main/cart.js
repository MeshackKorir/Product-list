document.addEventListener("DOMContentLoaded", () => {
    let cartTotal = 0;

    // Add to cart functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            let priceText = button.previousElementSibling.textContent;
            let price = parseFloat(priceText.replace("$", ""));
            cartTotal += price;
            document.getElementById("cart-total").textContent = cartTotal.toFixed(2);
        });
    });

    // Delete functionality
    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", () => {
            let itemID = button.dataset.item;
            let itemPriceText = document.getElementById(itemID).querySelector("p").textContent;
            let itemPrice = parseFloat(itemPriceText.replace("$", ""));
            cartTotal -= itemPrice;
            document.getElementById("cart-total").textContent = cartTotal.toFixed(2);
            document.getElementById(itemID).remove(); // Remove the item from the DOM
        });
    });
});

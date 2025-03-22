document.addEventListener("DOMContentLoaded", () => {
    let cartTotal = 0;

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            let priceText = button.previousElementSibling.textContent;
            let price = parseFloat(priceText.replace("$", ""));

            cartTotal+= price;

            document.getElementById("cart-total").textContent = cartTotal.toFixed(2) 
        });
    });
});

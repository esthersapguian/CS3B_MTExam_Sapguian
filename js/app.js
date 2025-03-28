document.addEventListener("DOMContentLoaded", () => {
    let cart = [];

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const productCard = event.target.closest(".feature-card");
            const productName = productCard.querySelector("h3").innerText;
            const productPrice = parseFloat(productCard.querySelector(".price").innerText.replace("Price: $", ""));

            // Check if item is already in cart
            let existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        const cartSummary = document.querySelector(".cart-summary ul");
        cartSummary.innerHTML = ""; // Clear previous list
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - Qty: <span class="qty">${item.quantity}</span> - Price: $${(item.price * item.quantity).toFixed(2)}
                <button class="increase" data-name="${item.name}">+</button>
                <button class="decrease" data-name="${item.name}">-</button>
            `;
            cartSummary.appendChild(li);
            total += item.price * item.quantity;
        });

        document.querySelector(".cart-summary h3").innerHTML = `Total: $${total.toFixed(2)}`;

        addQuantityEventListeners();
    }

    function addQuantityEventListeners() {
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", (event) => {
                const productName = event.target.dataset.name;
                let item = cart.find(item => item.name === productName);
                if (item) {
                    item.quantity += 1;
                    updateCartDisplay();
                }
            });
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", (event) => {
                const productName = event.target.dataset.name;
                let item = cart.find(item => item.name === productName);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    updateCartDisplay();
                } else {
                    cart = cart.filter(i => i.name !== productName); // Remove item if quantity reaches 0
                }
                updateCartDisplay();
            });
        });
    }
});


